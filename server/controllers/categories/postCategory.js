const asyncHandler = require("express-async-handler");
const Category = require("../../models/categoryModel");

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  const { categoryName } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!categoryName && !image) {
    return res
      .status(400)
      .json({ message: "Category name and image are required" });
  }

  const newCategory = new Category({
    categoryName,
    image,
  });

  const savedCategory = await newCategory.save(); // Save to the database

  res.status(201).json({
    message: "Category created successfully",
    category: savedCategory,
  });
});

module.exports = {
  createCategory,
};
