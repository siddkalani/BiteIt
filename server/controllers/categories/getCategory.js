const asyncHandler = require("express-async-handler");
const Category = require("../../models/categoryModel");

// GET - /category/get/:id
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Populate the foodItems field with the actual food item data
  const category = await Category.findById(id).populate("foodItems");

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  // Extract the food items from the category
  const foodItems = category.foodItems;

  res.status(200).json({ message: "Category Found", foodItems });
});

module.exports = {
  getCategory,
};

// GET - /category/get
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories: categories });
});

module.exports = { getCategory, getAllCategories };
