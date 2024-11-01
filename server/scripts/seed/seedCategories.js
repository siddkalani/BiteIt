const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Category = require("../../models/categoryModel"); 
const fs = require("fs");
const path = require("path");

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getImagePath = (imageName) => `/uploads/${imageName}`;

// Seed categories with image paths
const predefinedCategories = [
    {
        categoryName: "mango",
        image: getImagePath("sandwich.webp"),
    },
];

const seedCategories = async () => {
  try {
    const categoryNames = predefinedCategories.map(category => category.categoryName);

    // Check for existing categories to avoid duplicates
    const existingCategories = await Category.find({
      categoryName: { $in: categoryNames },
    }).select("categoryName");

    const existingCategoriesSet = new Set(existingCategories.map(category => category.categoryName));

    // Filter out categories that are already in the database
    const newCategories = predefinedCategories.filter(
      category => !existingCategoriesSet.has(category.categoryName)
    );

    // Bulk insert new categories if any
    if (newCategories.length > 0) {
      await Category.insertMany(newCategories);
      console.log("Categories seeded successfully.");
    } else {
      console.log("All predefined categories are already seeded.");
    }
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedCategories();
