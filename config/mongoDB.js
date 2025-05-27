import mongoose from "mongoose"

const connectDB = async()=>{
 await mongoose.connect(process.env.MONGOdb_URL,
  { dbName: "saas"}
 ).then(()=>{
  console.log("Mongodb Connected...")
 }).catch((err)=>{
  console.log(err.message)
 })
}

export default connectDB;