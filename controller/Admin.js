import { AdminModel } from "../models/Admin.js";
import bcrypt from "bcryptjs";  
import jwt from "jsonwebtoken"; 
import { userModel } from "../models/User.js";
import fs from 'fs';
import pkg from "json2csv";
const { Parser } = pkg;


export const registerAdmin = async (req, res) => {
  const { name ,email, password ,role } = req.body;

  try {
    if(!name  || !email || !password)
      return res.json({message:"All field are required",success:false})
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await AdminModel.create({ email, password: hashedPassword,role });

    res.status(201).json({ message: "Admin registered successfully", success: true,  newAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


export const loginAdmin = async (req, res) => {
  const { email, password  } = req.body;

  try {
    if(!email || !password)
      return res.json({message:"All field are required",success:false})

    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign(
  { userId: admin._id, role: "admin" }, 
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

  console.log(admin.role)
    res.status(200).json({ message: "Login successful", success: true, token , admin  });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};



export const getActiveUsers = async (req, res) => {
  try {
    const users = await userModel.find({ isLoggedIn: true }).select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllusers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ success: true, users });
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

    res.status(200).json({ message: "User details fetched successfully", success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};



export const exporttoCSV = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    const parser = new Parser();
    const csv = parser.parse(users);

    const filename = './User.csv';
    fs.writeFileSync(filename, csv);

    res.status(200).json({ message: "Csv file saved successfully ", PathName: filename });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
