import { SubscriptionModel } from "../models/Subscription.js";

export const createSubscription = async (req, res) => {
  try {
    const { userId, productId, planId, purchaseDate, expiryDate, status } = req.body;

    const newSubscription = await SubscriptionModel.create({
      userId, productId, planId, purchaseDate, expiryDate, status
    });

    res.status(201).json({
      message: "New subscription has been created",
      success: true,
      subscription: newSubscription
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false
    });
  }
};

export const AllSubscription = async (req, res) => {
  try {
    const subscription = await SubscriptionModel.find();
    res.status(200).json({
      message: "All subscriptions fetched successfully",
      success: true,
      subscription
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const ActiveSubscription = async (req, res) => {
  try {
    const transactions = await SubscriptionModel.find({ status: "Active" });

    res.status(200).json({
      message: "Active subscriptions fetched successfully",
      success: true,
      transactions
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};
