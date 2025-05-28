import express from "express"
import { login, register } from "../controller/User.js";
import { userRegisterValidation } from "../validators/Validators.js";
import { validateRequest } from "../middleware/validateRequest.js";


const userRouter = express.Router();

userRouter.post("/register",userRegisterValidation,validateRequest,register);
userRouter.post("/login",login);

export default  userRouter;