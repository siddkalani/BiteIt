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

  res.status(200).json({ message: "Item Found", item:item });
});

// GET - /food-item/get
const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  res.status(200).json({ items: items });
});

module.exports = { getItem , getAllItems };
