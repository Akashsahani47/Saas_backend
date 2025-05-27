import express from "express"
import { createOrder, verifyPayments } from "../controller/razorpaycheckout.js";

const PaymentRouter = express.Router();

PaymentRouter.post("/create_order",createOrder);
PaymentRouter.post("/verify_payment",verifyPayments)

export default PaymentRouter;