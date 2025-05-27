import {AdminModel} from "../models/Admin.js";
import bcrypt from "bcryptjs";  
import jwt from "jsonwebtoken"; 
import {userModel} from "../models/User.js";
import fs from 'fs';
import pkg from "json2csv";
const { Parser } = pkg;


export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.json({ message: "Admin already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await AdminModel.create({ email, password: hashedPassword });

    res.json({ message: "Admin registered successfully", success: true, admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.json({ message: "Admin not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ UserId: admin._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.json({ message: "Login successful", success: true, token });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};



export const getActiveUsers = async (req, res) => {
  try {
    const users = await userModel.find({ isLoggedIn: true }).select("-password");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllusers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const userDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "There is no user with this ID", success: false });
    }

    res.json({ message: "User details fetched successfully", success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};



export const exporttoCSV = async(req,res)=>{
  try {
     const users = await userModel.find().select("-password");
    const parser = new Parser();
    const csv = parser.parse(users);


    const filename='./User.csv'
    fs.writeFileSync(filename,csv)

res.json({message:"Csv file saved successfully ",PathName:filename})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}