const asyncHandler = require("express-async-handler");
const Order = require("../../models/orderModel");
const Item = require("../../models/foodItemModel");
const Canteen = require("../../models/canteenModel");
const io = require("../../config/socket");

// POST -> /user/order/add
const createOrder = asyncHandler(async (req, res) => {
  const {
    userId,
    canteenName,
    items, // Expecting an array of items [{ itemId, itemQuantity }]
    totalAmount,
    payment,
    status,
    deliverTo
  } = req.body;

  if (!userId || !canteenName || !items || items.length === 0 || !totalAmount || deliverTo) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (payment !== 1) {
    return res.status(400).json({ message: "Payment not done!" });
  }

  try {
    // Validate the canteen exists
    const canteen = await Canteen.findOne({ canteenName });
    if (!canteen) {
      return res.status(404).json({ message: "Canteen not found" });
    }

    // Process each item in the order
    const orderedItems = await Promise.all(
      items.map(async (orderItem) => {
        const item = await Item.findById(orderItem.itemId);
        if (!item) {
          throw new Error(`Item with ID ${orderItem.itemId} not found`);
        }
        return {
          itemId: item._id,
          itemName: item.itemName,
          itemQuantity: orderItem.itemQuantity,
        };
      })
    );

    // Create the new order with multiple items
    const newOrder = new Order({
      userId,
      canteenId: canteen._id,
      items: orderedItems, // Store the array of ordered items
      totalAmount,
      payment,
      status,
      canteenName: canteen.canteenName,
      deliverTo
    });

    const savedOrder = await newOrder.save();

    // Add the order to the canteen's orders array
    canteen.orders.push(savedOrder._id);
    await canteen.save();

    const io = req.app.get('io');

    // Emit an event to notify the admin panel of a new order
    io.emit("newOrder", savedOrder);
    console.log("new order emitted on server");

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error saving order", error: error.message });
  }
});

module.exports = {
  createOrder,
};
