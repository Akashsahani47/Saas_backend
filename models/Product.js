import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  feature: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const Productmodel = mongoose.model("product", ProductSchema);
