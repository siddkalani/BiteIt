// const asyncHandler = require("express-async-handler");
// const Item = require("../../models/foodItemModel");

// // Create a new Item
// const createItem = asyncHandler(async (req, res) => {
//   const { categoryId, itemName, itemPrice, itemIncredients } = req.body;
//   const image = req.file ? req.file.filename : null;

//   if (!categoryId || !itemName || !itemPrice || !itemIncredients || !image) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Check if an item with the same name already exists in the same category
//   const existingItem = await Item.findOne({ itemName, categoryId });
//   if (existingItem) {
//     return res.status(400).json({
//       message: "Item with this name already exists in the selected category",
//     });
//   }

//   const newItem = new Item({
//     categoryId,
//     itemName,
//     itemPrice,
//     itemIncredients,
//     image,
//   });

//   try {
//     const savedItem = await newItem.save();
//     res.status(201).json({
//       message: "Item created successfully",
//       Item: savedItem,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error saving item", error: error.message });
//   }
// });

// module.exports = {
//   createItem,
// };

const asyncHandler = require("express-async-handler");
const Category = require("../../models/categoryModel");
const Item = require("../../models/foodItemModel");

// Create a new Item
const createItem = asyncHandler(async (req, res) => {
  const { categoryId, itemName, itemPrice, itemIncredients , isOnline} = req.body;
  const image = req.file ? req.file.filename : null;

  if (!categoryId || !itemName || !itemPrice || !itemIncredients || !image || !isOnline) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if an item with the same name already exists in the same category
  const existingItem = await Item.findOne({ itemName, categoryId });
  if (existingItem) {
    return res.status(400).json({
      message: "Item with this name already exists in the selected category",
    });
  }

  const newItem = new Item({
    categoryId,
    itemName,
    itemPrice,
    itemIncredients,
    image,
    isOnline
  });

  try {
    const savedItem = await newItem.save();

    // Add FoodItem to Category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.foodItems.push(savedItem._id);
    await category.save();

    res.status(201).json({
      message: "Item created successfully",
      Item: savedItem,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving item", error: error.message });
  }
});

module.exports = {
  createItem,
};
