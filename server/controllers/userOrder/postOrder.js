const asyncHandler = require("express-async-handler");
const Order = require("../../models/orderModel");

//POST -> /user/order/add
const createOrder = asyncHandler(async (req, res) => {
  const { userId, canteenId, itemId, itemQuantity, totalAmount,payment, status } =
    req.body;

  if (!userId || !canteenId || !itemId || !itemQuantity || !totalAmount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (payment !== 1) {
    return res.status(400).json({ message: "Payment not done!" });
  }

  const newOrder = new Order({
    userId,
    canteenId,
    itemId,
    itemQuantity,
    // itemImage,
    totalAmount,
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
