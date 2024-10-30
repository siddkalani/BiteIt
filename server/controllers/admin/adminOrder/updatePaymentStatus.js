const asyncHandler = require("express-async-handler");
const Order = require("../../../models/orderModel");

// PATCH -> /user/order/payment/:id
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { payment } = req.body; // Expecting payment status in request body

//   if (payment !== 1) {
//     return res.status(400).json({ message: "Payment status must be set to 1." });
//   }

  try {
    // Find the order by ID
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
   
    // Update the payment status
    order.payment = payment; // Update payment status to 1
    await order.save();
    const io = req.app.get("io");
    io.emit("paymentDone", order);

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
