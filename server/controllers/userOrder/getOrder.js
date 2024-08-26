const asyncHandler = require("express-async-handler");
const Order = require("../../models/orderModel");
const OrderHistory = require("../../models/orderModel");

// Get orders placed by a specific user
//GET -> /user/order/:userId
const getUserOrders = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).populate("userId", "name");
    res.status(200).json({ orders: orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user's orders", error });
  }
});

// Get order history for a specific user
//GET -> /user/order/history/:userId
const getOrderHistory = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    // Find orders for the given userId and sort them by orderPlacedAt in descending order
    const orderHistory = await OrderHistory.find({ userId })
      .populate("userId", "name")
      .sort({ orderPlacedAt: -1 }); // Sort by orderPlacedAt in descending order

    res.status(200).json({ orderHistory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user's order history", error });
  }
});

module.exports = { getUserOrders, getOrderHistory };
