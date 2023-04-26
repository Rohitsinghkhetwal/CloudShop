import mongoose, {Schema} from "mongoose";
import {Iproduct} from "../Types";

const ProductSchema = new mongoose.Schema<Iproduct>({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}, 
{
    timestamps: true
})


const Product = mongoose.model("products", ProductSchema);

export default Product;