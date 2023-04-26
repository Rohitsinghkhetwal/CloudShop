import { Request, Response } from "express";
import stripe from "stripe";
import Order from "../models/OrderModel";

const stripeClients = new stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15"
})



export const webhookHandler = async(request: Request, response: Response) => {
    try{
        const sig = request.headers["stripe-signature"] as string
        const event = stripeClients.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEB_HOOK_SECRET
        )
        if(event.type === "payment_intent.created") {
            const charge = event.data.object as stripe.Charge
            const order = await Order.findOne({
                paymentIntentId: charge.payment_intent,

            })
            if(order) {
                order.paymentStatus ="paid"
                order.paymentDetail = charge
                await order.save()
            }
        }
        response.send({recieved : true})


        console.log(process.env.STRIPE_SECRET_KEY);
        console.log(process.env.STRIPE_WEB_HOOK_SECRET);
    }catch(error) {

        console.log("Something went wrong___");
        throw(error)
    }

}