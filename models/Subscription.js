import mongoose  from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  purchaseDate: {type:Date},
  expiryDate: {type:Date},
  status: { type: String, enum: ['Active', 'Expired'], default: 'Active' }
});

export const SubscriptionModel = mongoose.model("subscription",SubscriptionSchema)