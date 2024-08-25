const asyncHandler = require("express-async-handler");
const Order = require("../../models/orderModel");
const Item = require("../../models/foodItemModel"); 

//POST -> /user/order/add
const createOrder = asyncHandler(async (req, res) => {
  const { userId, canteenId, itemId, itemQuantity, totalAmount, payment, status } = req.body;

  if (!userId || !itemId || !itemQuantity || !totalAmount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (payment !== 1) {
    return res.status(400).json({ message: "Payment not done!" });
  }

  // Fetch item details to get itemName
  const item = await Item.findById(itemId);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  const newOrder = new Order({
    userId,
    canteenId,
    itemId,
    itemName: item.itemName, // Add itemName
    itemQuantity,
    totalAmount,
    payment,
    status,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving order", error });
  }
});

module.exports = {
  createOrder,
};
