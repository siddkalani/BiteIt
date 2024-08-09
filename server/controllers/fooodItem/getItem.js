const asyncHandler = require("express-async-handler");
const Item = require("../../models/foodItemModel");

// GET - /food-item/get/:id
const getItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await Item.findById(id);

  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  res.status(200).json({ message: "Item Found", item: item });
});

// GET - /food-item/get
const getAllItems = asyncHandler(async (req, res) => {
  try {
    const items = await Item.find(); // Ensure Item is your food item model
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items", error: error.message });
  }
});


module.exports = { getItem, getAllItems };
