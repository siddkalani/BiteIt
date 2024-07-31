const asyncHandler = require("express-async-handler");
const Category = require("../../models/categoryModel");

// GET - /category/get/:id
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.status(200).json({ message: "Category Found", category });
});

// GET - /category/get
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories: categories });
});

module.exports = { getCategory, getAllCategories };
