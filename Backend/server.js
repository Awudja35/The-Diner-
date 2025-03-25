import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import stripe from "stripe";

import connectMongoDB from "./db/connectMongodb.js";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import paymentRouter from "./routes/payment.route.js";
import analyticsRouter from "./routes/analytics.route.js";
import booktableRouter from "./routes/bookTable.route.js";

dotenv.config();

const app = express();

process.env.STRIPE_SECRET;
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/book", booktableRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectMongoDB();
});

//CbTrnEApzzyB6jrX
