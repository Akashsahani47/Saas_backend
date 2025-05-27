import { SubscriptionModel } from "../models/Subscription.js";



export const createSubscription = async (req, res) => {
  try {
    const { userId, productId, planId, purchaseDate, expiryDate, status } = req.body;

    const newSubscription = await SubscriptionModel.create({
      userId,productId,planId,purchaseDate,expiryDate,status
    });

    res.json({message: "New subscription has been created",success: true,subscription: newSubscription});
  } catch (error) {
    res.status(400).json({message: error.message,success: false});
  }
};



export const AllSubscription = async (req, res) => {
  try {
    const subscription = await SubscriptionModel.find();
    res.json({message:"All the subscription are",success:true,subscription});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const ActiveSubscription = async (req, res) => {
  try {
    const transactions = await SubscriptionModel.find({ status: 'Active' })

    res.json({message: 'Active Subscription fetched successfully',success: true,transactions,});
  } catch (error) {
    res.status(500).json({message: error.message,success: false,});
  }
};



