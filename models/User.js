import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
 name: {type:String, required:true,trim:true},
 email: {type:String, required:true,unique:true,lowercase: true},
 password: {type:String, required:true},
 phone: {type:String,trim:true},
 isVarified:{type:Boolean,default:false},
 isBanned:{type:Boolean,default:false},
 amountPaid:{type: Number},
 isLoggedIn: { type: Boolean, default: false },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
})

export const userModel = mongoose.model('User', userSchema)

