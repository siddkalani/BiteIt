const asyncHandler = require("express-async-handler");
const Category = require("../../models/categoryModel");

// GET - /category/get/:id
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const category = await Category.findById({ id });

  if (!category) {
    res.status(400).json({ message: "Category not found" });
  }
  res.status(201).json({ message: "Category Found", category: category });
});

// GET - /category/get
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories: categories });
});

module.exports = {getCategory, getAllCategories};
