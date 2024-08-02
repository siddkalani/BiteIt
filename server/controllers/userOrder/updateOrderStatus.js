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
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status === 1) {
      console.log("Order delivered. Creating order history..."); 

      const newOrderHistory = new UserOrderHistory({
        userId: updatedOrder.userId, 
        canteenId: updatedOrder.canteenId, 
        itemId: updatedOrder.itemId, 
        itemQuantity: updatedOrder.itemQuantity, 
        itemImage: updatedOrder.itemImage,
        totalAmount: updatedOrder.totalAmount, 
        status: 1, 
      });

      try {
        await newOrderHistory.save(); 
        console.log("Order history saved successfully."); 
      } catch (saveError) {
        console.error("Error saving order history:", saveError);
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
