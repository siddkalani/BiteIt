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
      "orderId userId userName items totalAmount payment status canteenId canteenName orderPlacedAt updatedAt"
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

// PUT -> /admin/order/status/:id
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status
  const validStatuses = [
    "Pending",
    "Accepted",
    "Preparing",
    "Ready",
    "Delivered",
    "Rejected",
  ];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  // Fetch the order by ID
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Update the status
  order.status = status;

  // Set the deliveredAt timestamp if applicable
  if (status === "Delivered" && !order.deliveredAt) {
    order.deliveredAt = new Date();
  }

  // Save the updated order
  await order.save();

  // Access Socket.IO instance
  const io = req.app.get("io");
  if (!io) {
    console.error("Socket.IO instance not found");
    return res.status(500).json({ message: "Internal server error" });
  }

  // Handle status-specific logic
  try {
    switch (status) {
      case "Accepted":
        io.emit("orderAccepted", order);
        await sendNotification(
          order.userId,
          "Order Accepted",
          `Your order is confirmed and will be prepared shortly.`
        );
        break;

      case "Preparing":
        io.emit("orderPreparing", order);
        await sendNotification(
          order.userId,
          "Order Preparing",
          `Your order is now being prepared.`
        );
        break;

      case "Ready":
        io.emit("orderReady", order);
        await sendNotification(
          order.userId,
          "Order Ready",
          `Your order is ready for pickup.`
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
        console.log("Order history saved successfully.");

        await sendNotification(
          order.userId,
          "Order Delivered",
          `Your order has been delivered.`
        );
        break;

      case "Rejected":
        await Order.findByIdAndDelete(id); // Delete the order
        io.emit("orderRejected", order);
        await sendNotification(
          order.userId,
          "Order Rejected",
          `Your order has been rejected.`
        );
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(`Error handling status "${status}":`, error);
    return res.status(500).json({ message: `Error updating order: ${error.message}` });
  }

  // Respond with success
  res.status(200).json({ message: `Order ${status} successfully`, order });
});

module.exports = { updateOrderStatus, getAllOrders };
