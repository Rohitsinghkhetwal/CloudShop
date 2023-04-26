import { Request, Response } from "express";
import { IOrder, IOrderItem } from "../Types";
import Order from "../models/OrderModel";
import stripe from "stripe";
import * as dotenv from "dotenv"
dotenv.config();

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15"
})



//to make a request to stripe it will return a paymentIntent we've to pass currency and order amount
//save paymentintentId in orderModel
//Return paymentIntent Id client secret
const BASE_UNIT = 100;

const getTotalAmount = (orderItem: IOrderItem[]) => {
    return (
        orderItem.reduce((acc, items) =>  acc + items.price * items.quantity, 0)* BASE_UNIT
        )

}


type createOrderType = Pick<IOrder, "user" | "deliveryAddress" | "orderItem" | "totalPrice">

export const createOrder = async(request: Request, response: Response) => {
    try{
        const {user, deliveryAddress, orderItem, totalPrice}:createOrderType = request.body;
        //we will calculate all the amount in server 
        const totalAmount = getTotalAmount(orderItem)

        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: totalAmount,
            currency: 'inr'
        })


        const result = await Order.create({
            user,
            deliveryAddress,
            orderItem,
            totalPrice,
            paymentIntentId: paymentIntent.id,
            paymentStatus: "Pending",
            paymentDetail: {},
        })
        response.send({
             clientSecret: paymentIntent.client_secret,
        });


    }catch(error) {
        
        console.log("Something went wrong_________!",error);
        response.send({
            message: "Something went wrong in creating order!!!!"
        })
    }

}