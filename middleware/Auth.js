import jwt from "jsonwebtoken";
import { userModel } from "../models/User.js";
import { AdminModel } from "../models/Admin.js";  // import your admin model

export const isAuthentic = async (req, res, next) => {
  try {
    const token = req.header('Auth'); 

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
        success: false
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check the role from token payload (assumes token has role info)
    if (!decoded.role) {
      return res.status(401).json({
        message: "Invalid token: role missing",
        success: false
      });
    }

    let userOrAdmin;

    if (decoded.role === 'admin') {
      userOrAdmin = await AdminModel.findById(decoded.userId);
      if (!userOrAdmin) {
        return res.status(401).json({
          message: "Admin not found",
          success: false
        });
      }
      req.admin = userOrAdmin;  // attach admin info to req
    } else if (decoded.role === 'user') {
      userOrAdmin = await userModel.findById(decoded.userId);
      if (!userOrAdmin) {
        return res.status(401).json({
          message: "User not found",
          success: false
        });
      }
      req.user = userOrAdmin;  // attach user info to req
    } else {
      return res.status(401).json({
        message: "Invalid role",
        success: false
      });
    }

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
      error: error.message
    });
  }
};
