import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/mongoDB.js';
import userRouter from './routes/User.js';
import productRouter from './routes/Product.js';
import AdminRouter from './routes/Admin.js';
import { authRateLimiter } from './middleware/rateLimiter.js';
import PaymentRouter from './routes/RazorPayment.js';
import Subsrouter from './routes/Subscription.js';




const server = express();


server.use(express.json());

connectDB();

server.get('/',(req,res)=>{
 res.json({message:"Api is working "})
})

userRouter.use(authRateLimiter);
server.use("/api/user",userRouter)
server.use("/api",productRouter)
server.use("/api",AdminRouter)
server.use("/api",PaymentRouter);
server.use("/api",Subsrouter);



const port = process.env.PORT || 3000;
server.listen(port,()=> 
 console.log(`Server is running at the port http://localhost:${port}`))
