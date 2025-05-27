import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import {userModel} from "../models/User.js";
import transporter from '../config/nodemailer.js'; 

export const register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    if (!name || !email || !password || !phone) {
      return res.json({  message: "All fields are required",success: false });
    }

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ message: "User already exists", success: false});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

   const mailOptions = {
  from: process.env.SENDER_EMAIL,
  to: email,
  subject: "Welcome to my BackendProject",
  html: `
    <div>
      <h1>Thank you for registering!</h1>
      <p>We're glad to have you onboard.</p>
    </div>
  `
};

await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Welcome Sir", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message , success: false});
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({ message: "All fields are required", success: false });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User is not registered", success: false });
    }

    const validatepass = await bcrypt.compare(password, user.password);
    if (!validatepass) {
      return res.json({ message: "Email and Password is incorrect", success: false });
    }

    const token = await jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  


    user.isLoggedIn = true;
    user.lastLogin = new Date();
    await user.save();
    res.json({
      message: "Login Successfully",
      success: true,
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


