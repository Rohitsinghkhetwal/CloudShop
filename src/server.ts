import * as  dotenv from "dotenv";
import express from "express";
import dbConnection from "./db";
import productRouter from "./routes/ProductRoute";
import OrderRoutes from "./routes/OrderRoute";
import { webhookHandler } from "./webhook";
import cors from "cors"
dotenv.config()
const app = express();
app.use(cors())
app.use(express.json());
dbConnection();
 

 app.get("/", (request, response) => {
    response.send("ping")

 })

 app.post("/webhook", express.raw({type: "application/json"}), webhookHandler)

 const MYPORT = process.env.PORT || 3000
 app.use("/products", productRouter)
 app.use("/Order", OrderRoutes);
 

 app.listen(MYPORT, () => {
    console.log("Server is up and running at", MYPORT);
 })
