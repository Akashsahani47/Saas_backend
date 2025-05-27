import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  amount:{type:Number} ,
  date: {type:Date},
  paymentId: {type:String},
  method: {type:String}
});

export const Transaction = mongoose.model("transaction", TransactionSchema);