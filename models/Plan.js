import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }, 
  name: { type: String, enum: ['Basic', 'Advanced', 'Premium'], required: true },
  price: { type: Number, required: true },
  featuresCount: { type: Number },
  features: [String],
  createdAt: { type: Date, default: Date.now }
});

export const PlanModel= mongoose.model("plan", PlanSchema);
