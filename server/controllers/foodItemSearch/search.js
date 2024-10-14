// Import necessary modules
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Item = require("../../models/foodItemModel");
// GET - /food-item/search
const searchItems = asyncHandler(async (req, res) => {
  const { query } = req.query;
  console.log(query);

  if (!query || query.length < 2) {
    res.status(400).json({ message: "Query parameter must be at least 2 characters long" });
    return;
  }

  try {
    // Split query into words
    const keywords = query.split(" ").filter(Boolean);

    // Build a regex pattern that matches any of the words
    const regex = keywords.map((word) => new RegExp(word, "i"));

    // Search for items where the name matches any of the keywords (case-insensitive)
    const items = await Item.find({
      itemName: { $in: regex },
    });

    if (items.length === 0) {
      res.status(404).json({ message: "No items found" });
      return;
    }

    res.status(200).json({ items });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to search items", error: error.message });
  }
});

module.exports = { searchItems };
