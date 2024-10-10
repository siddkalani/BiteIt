// const asyncHandler = require("express-async-handler");
// const Order = require("../../models/orderModel");
// const Item = require("../../models/foodItemModel");
// const Canteen = require("../../models/canteenModel");
// const io = require("../../config/socket");

// // POST -> /user/order/add
// const createOrder = asyncHandler(async (req, res) => {
//   const {
//     userId,
//     canteenName,
//     itemId,
//     itemQuantity,
//     totalAmount,
//     payment,
//     status,
//   } = req.body;

//   if (!userId || !canteenName || !itemId || !itemQuantity || !totalAmount) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   if (payment !== 1) {
//     return res.status(400).json({ message: "Payment not done!" });
//   }

//   const item = await Item.findById(itemId);
//   if (!item) {
//     return res.status(404).json({ message: "Item not found" });
//   }

//   const canteen = await Canteen.findOne({ canteenName });
//   if (!canteen) {
//     return res.status(404).json({ message: "Canteen not found" });
//   }

//   const newOrder = new Order({
//     userId,
//     canteenId: canteen._id,
//     itemId,
//     itemName: item.itemName,
//     itemQuantity,
//     totalAmount,
//     payment,
//     status,
//     canteenName: canteen.canteenName,
//   });

//   try {
//     const savedOrder = await newOrder.save();

//     // Add the order to the canteen's orders array
//     canteen.orders.push(savedOrder._id);
//     await canteen.save();

//     // Emit an event to notify the admin panel of a new order
//     io.emit("newOrder", savedOrder);

//     res.status(201).json({
//       message: "Order created successfully",
//       order: savedOrder,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error saving order", error });
//   }
// });

// module.exports = {
//   createOrder,
// };


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
    itemId,
    itemQuantity,
    totalAmount,
    payment,
    status,
  } = req.body;

  if (!userId || !canteenName || !itemId || !itemQuantity || !totalAmount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (payment !== 1) {
    return res.status(400).json({ message: "Payment not done!" });
  }

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const canteen = await Canteen.findOne({ canteenName });
    if (!canteen) {
      return res.status(404).json({ message: "Canteen not found" });
    }

    const newOrder = new Order({
      userId,
      canteenId: canteen._id,
      itemId,
      itemName: item.itemName,
      itemQuantity,
      totalAmount,
      payment,
      status,
      canteenName: canteen.canteenName,
    });

    const savedOrder = await newOrder.save();

    // Add the order to the canteen's orders array
    canteen.orders.push(savedOrder._id);
    await canteen.save();

    const io = req.app.get('io');

    // Emit an event to notify the admin panel of a new order
    io.emit("newOrder", savedOrder);

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
