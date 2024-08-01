const asyncHandler = require("express-async-handler");
const Order = require("../../models/orderModel");
const UserOrderHistory = require("../../models/userOrderHistoryModel");

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
const getUserOrderHistory = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const orderHistory = await UserOrderHistory.find({ userId }).populate(
      "userId",
      "name"
    );
    res.status(200).json({ orderHistory: orderHistory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user's order history", error });
  }
});

// // Get all orders
// //GET -> /admin/order/getAll
// const getAllOrders = asyncHandler(async (req, res) => {
//   try {
//     const orders = await Order.find().populate("userId", "name email"); // Include user details
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching all orders", error });
//   }
// });

// // Get all order history
// const getAllOrderHistory = asyncHandler(async (req, res) => {
//     try {
//       const orderHistory = await UserOrderHistory.find()
//         .populate('userId', 'name'); // Include user details
//       res.status(200).json(orderHistory);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching all order history", error });
//     }
//   });

module.exports = { getUserOrders, getUserOrderHistory };
