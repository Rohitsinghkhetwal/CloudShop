import express from "express";
import { createProduct, getProductById, getProducts } from "../Controllers/ProductController";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/items", getProducts)
productRouter.get("/:id", getProductById)

export default productRouter;