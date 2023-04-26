import express from "express";
import { createOrder } from "../Controllers/OrderController";

const OrderRoutes = express.Router();

OrderRoutes.post("/items", createOrder);



export default OrderRoutes;