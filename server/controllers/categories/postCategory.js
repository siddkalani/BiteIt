const asyncHandler = require("express-async-handler");
const Category = require("../../models/categoryModel");

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
  const { category_name } = req.body; 

  if (!category_name) {
    return res.status(400).json({ message: "Category name is required" }); 
  }

  const newCategory = new Category({
    category_name
  });

  const savedCategory = await newCategory.save(); // Save to the database

  res.status(201).json({
    message: "Category created successfully",
    category: savedCategory
  }); 
});

module.exports = {
  createCategory,
};
