const asyncHandler = require("express-async-handler");
const Order = require("../../../models/orderModel");
const OrderHistory = require("../../../models/orderHistory");
const {sendNotification}  = require('../../../utils/notification')

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    // Find orders with status "Pending", "Accepted", "Preparing", or "Ready"
    const orders = await Order.find({
      status: { $in: ['Pending', 'Accepted', 'Preparing', 'Ready', 'Delivered'] }
    }).select(
      "orderId userId userName items totalAmount payment status canteenId canteenName deliverTo orderPlacedAt deliveredAt"
    );

    // Iterate over each order and log the items for debugging
    orders.forEach(order => {
      console.log(`Order ID: ${order._id}, Items:`);
      order.items.forEach(item => {
        console.log(`Item ID: ${item.itemId}, Item Name: ${item.itemName}, Quantity: ${item.itemQuantity}`);
      });
    });

    // Send response with orders and their items
    res.status(200).json({ orders });
  } catch (error) {
    // Log error and send error response
    console.error("Error fetching pending orders:", error);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});


// POST -> /admin/orders/status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { updates } = req.body; // Expect an array of { id, status } objects

  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ message: "Invalid updates format or empty list." });
  }

  // Validate statuses
  const validStatuses = ["Pending", "Accepted", "Rejected", "Ready", "Delivered"];
  for (const update of updates) {
    if (!update.id || !validStatuses.includes(update.status)) {
      return res.status(400).json({ message: "Invalid order ID or status." });
    }
  }

  // Fetch and update orders in a batch
  const updatedOrders = [];
  const io = req.app.get("io"); // Access Socket.IO instance

  try {
    for (const update of updates) {
      const { id, status } = update;

      // Find and update each order
      const order = await Order.findById(id);
      if (!order) {
        console.error(`Order not found: ${id}`);
        continue; // Skip invalid orders
      }

      order.status = status;

      // Set the deliveredAt timestamp if applicable
      if (status === "Delivered" && !order.deliveredAt) {
        order.deliveredAt = new Date();
      }

      await order.save();
      updatedOrders.push(order);

      // Emit real-time updates and handle notifications
      switch (status) {
        case "Accepted":
          io.emit("orderAccepted", order);
          await sendNotification(
            order.userId,
            "Order Accepted",
            "Your order is confirmed and will be prepared shortly."
          );
          break;

        case "Ready":
          io.emit("orderReady", order);
          await sendNotification(
            order.userId,
            "Order Ready",
            "Your order is now ready. Please collect at the counter."
          );
          break;

        case "Delivered":
          io.emit("orderDelivered", order);

          // Save to OrderHistory
          const newOrderHistory = new OrderHistory({
            orderId: order._id,
            userId: order.userId,
            canteenId: order.canteenId,
            canteenName: order.canteenName,
            items: order.items, // Store the array of ordered items
            totalAmount: order.totalAmount,
            status: "Delivered",
            payment: order.payment,
            orderPlacedAt: order.orderPlacedAt,
            deliveredAt: order.deliveredAt,
          });
          await newOrderHistory.save();

          await sendNotification(
            order.userId,
            "Order Delivered",
            "Your order has been delivered."
          );
          break;

        case "Rejected":
          await Order.findByIdAndDelete(id); // Delete the order
          io.emit("orderRejected", order);
          await sendNotification(
            order.userId,
            "Order Rejected",
            "Your order has been rejected."
          );
          break;

        default:
          break;
      }
    }

    // Respond with success
    res.status(200).json({
      message: "Order statuses updated successfully.",
      updatedOrders,
    });
  } catch (error) {
    console.error("Error updating orders:", error);
    res.status(500).json({ message: `Error updating orders: ${error.message}` });
  }
});


module.exports = { updateOrderStatus, getAllOrders };


