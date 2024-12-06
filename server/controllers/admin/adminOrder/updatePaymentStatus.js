const asyncHandler = require("express-async-handler");
const Order = require("../../../models/orderModel");
const OrderHistory = require("../../../models/orderHistory"); // Import OrderHistory model

// PATCH -> /user/order/payment/:id
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { payment } = req.body;

  try {
    // Find the order by ID in the Order model
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Update the payment status in the Order model
    order.payment = payment;
    await order.save();

    // Find and update the corresponding order in the OrderHistory model
    const orderHistory = await OrderHistory.findOne({ orderId: id }); // Assuming 'orderId' in OrderHistory references 'Order'
    if (orderHistory) {
      orderHistory.payment = payment;
      await orderHistory.save();
    }

    // Emit real-time update for payment
    const io = req.app.get("io");
    
    io.emit("paymentDone", order); // Emit to update the client in real time

    res.status(200).json({
      message: "Payment status updated successfully.",
      order,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Error updating payment status", error: error.message });
  }
});

module.exports = {
  updatePaymentStatus,
};
