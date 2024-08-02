// const asyncHandler = require("express-async-handler");
// const Order = require("../../models/orderModel");

// // PUT -> /user/order/update-status/:id
// const updateOrderStatus = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (status === undefined) {
//     return res.status(400).json({ message: "Status is required" });
//   }

//   try {
//     // Find the order by ID and update the status
//     const updatedOrder = await Order.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true } // Return the updated document
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.status(200).json({
//       message: "Order status updated successfully",
//       order: updatedOrder,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating order status", error });
//   }
// });

// module.exports = {
//   updateOrderStatus,
// };

const asyncHandler = require("express-async-handler");
const Order = require("../../models/orderModel");
const UserOrderHistory = require("../../models/userOrderHistoryModel"); // Import UserOrderHistory model

// PUT -> /user/order/update-status/:id
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (status === undefined) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    // Find the order by ID and update the status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Add to UserOrderHistory if status is delivered (1)
    if (status === 1) {
      console.log("Order delivered. Creating order history..."); // Debugging log

      const newOrderHistory = new UserOrderHistory({
        userId: updatedOrder.userId, // Extract user ID from updated order
        canteenName: updatedOrder.canteenName, // Extract canteen name
        itemName: updatedOrder.itemName, // Extract item name
        itemQuantity: updatedOrder.itemQuantity, // Extract item quantity
        itemImage: updatedOrder.itemImage, // Extract item image (optional)
        totalAmount: updatedOrder.totalAmount, // Extract total amount
        status: 1, // Set status to delivered (1)
      });

      try {
        await newOrderHistory.save(); // Save new order history document
        console.log("Order history saved successfully."); // Debugging log
      } catch (saveError) {
        console.error("Error saving order history:", saveError); // Error logging
        return res.status(500).json({ message: "Error saving order history", error: saveError });
      }
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
});

module.exports = {
  updateOrderStatus,
};
