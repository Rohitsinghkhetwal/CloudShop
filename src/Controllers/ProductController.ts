import { Request, Response } from "express";
import Product from "../models/ProductModel";
import {Iproduct} from "../Types";

type SelectedItem = Pick<Iproduct, "image"| "name"| "price"| "description">


export const createProduct = async(request: Request, response: Response) => {
    try{
        const {name,price, description,image}: SelectedItem = request.body;

        const product = await Product.create({
            name, 
            image,
            description,
            price
        })
        response.send(product);

    }catch(err) {
        response.send({
            message: "Something went wrong!"
        })

        throw (err);
    }

}

export const getProducts = async(request: Request, response: Response) => {
    try{
        const result = await Product.find({});
        response.send(result);

    }catch(err) {
        response.send({
            message: "unable to retrive data"
        })
        console.log("Something went wrong");
        throw(err);
    }


}

export const getProductById = async(request: Request, response: Response) => {
    try{
        const { id} = request.params;
        const result = await Product.findById(id);
        response.send(result);

    }catch(err){
        response.send({
            message: "something went wrong"
        })
        console.log("Something went wrong");
    }

}

