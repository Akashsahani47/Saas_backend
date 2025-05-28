import { Productmodel } from "../models/Product.js";
import { PlanModel } from "../models/Plan.js";

export const newProduct = async (req, res) => {
  const { name, description, image, feature } = req.body;

  try {
    if (!name || !description || !image) {
      return res.status(400).json({
        message: "Name , Image and description are required",
        success: false,
      });
    }

    const existingProduct = await Productmodel.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({
        message: "This product already exists",
        success: false,
      });
    }

    const product = await Productmodel.create({
      name,
      description,
      image,
      feature,
    });

    res.status(201).json({
      message: "New product has been added successfully",
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};



export const getAllProduct = async (req, res) => {
  try {
    const product = await Productmodel.find();
    res.status(200).json({ message: "All product fetched successfully", success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}


export const getProductByID = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Productmodel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    res.status(200).json({ message: "product fetched successfully", success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}



export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, image, feature } = req.body;

  try {
    const updatedProduct = await Productmodel.findByIdAndUpdate(
      id,
      { name, description, image, feature },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};



export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Productmodel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    res.status(200).json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


export const addPlan = async (req, res) => {
  const { productId, name, price, features } = req.body;

  try {
    const plan = await PlanModel.create({ productId, name, price, features });
    res.status(201).json({ message: "Plan added successfully", success: true, plan });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


export const getPlansByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const plans = await PlanModel.find({ productId });
    res.status(200).json({ message: "Plans fetched", success: true, plans });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllPlain = async (req, res) => {
  try {
    const plainProduct = await PlanModel.find().populate("productId", "name");
    res.status(200).json({ message: "All plans product are fetched", success: true, plainProduct });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}
