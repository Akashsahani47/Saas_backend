import jwt from "jsonwebtoken";
import {userModel} from "../models/User.js";

export const isAuthentic = async (req, res, next) => {
  try {
    const token = req.header('Auth'); 

    if (!token) {
      return res.json({ message: "Login First", success: false });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.json({ message: "Invalid token", success: false });
    }

    req.user = user;
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};
