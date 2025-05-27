import dotenv, { config } from 'dotenv'
dotenv.config();
import razorpayInstance from "../config/razorpay.js";
import { PlanModel } from "../models/Plan.js";
import crypto, { Verify } from "crypto"



export const createOrder = async (req, res) => {
  try {
    const { planId } = req.body;

    const plan = await PlanModel.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    console.log("Plan Price:", plan.price); 

    const options = {
      amount: plan.price * 100, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({ message: "Done", success: true, order });
  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayments = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  try {
    console.log("Secret Key:", process.env.RAZORPAY_KEY_SECRET);

    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(order_id + "|" + payment_id);

    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
      return res.json({ message: "Payment Successful", success: true });
    } else {
      res.json({ message: "Payment Failed", success: false });
    }

  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: error.message });
  }
};
