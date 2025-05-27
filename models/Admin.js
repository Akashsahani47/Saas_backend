import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: {type:String},
  createdAt: { type: Date, default: Date.now },
  role: {type: String ,enum :["Admin" ,'user'] ,default: "Admin"}
});

export const AdminModel= mongoose.model("Admin", AdminSchema);