import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: {type:String},
  createdAt: { type: Date, default: Date.now },
  role: {type: String ,enum :["admin" ,'user'] ,default: "admin"}
});

export const AdminModel= mongoose.model("Admin", AdminSchema);