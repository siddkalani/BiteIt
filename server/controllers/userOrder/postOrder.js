// const asyncHandler = require("express-async-handler");
// const Order = require("../../models/orderModel");
// const Item = require("../../models/foodItemModel");
// const Canteen = require("../../models/canteenModel");

// // POST -> /user/order/add
// const createOrder = asyncHandler(async (req, res) => {
//   const { userId, canteenId, itemId, itemQuantity, totalAmount, payment, status } = req.body;

//   if (!userId || !canteenId || !itemId || !itemQuantity || !totalAmount) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   if (payment !== 1) {
//     return res.status(400).json({ message: "Payment not done!" });
//   }

//   // Fetch item details to get itemName
//   const item = await Item.findById(itemId);
//   if (!item) {
//     return res.status(404).json({ message: "Item not found" });
//   }

//   // Fetch canteen details to get canteenName
//   const canteen = await Canteen.findById(canteenId);
//   if (!canteen) {
//     return res.status(404).json({ message: "Canteen not found" });
//   }

//   const newOrder = new Order({
//     userId,
//     canteenId,
//     itemId,
//     itemName: item.itemName, // Add itemName
//     itemQuantity,
//     totalAmount,
//     payment,
//     status,
//     canteenName: canteen.canteenName, // Add canteenName
//   });

//   try {
//     // Save the new order
//     const savedOrder = await newOrder.save();

//     // Add the order to the canteen's orders array
//     canteen.orders.push(savedOrder._id);
//     await canteen.save();

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

  // Fetch item details to get itemName
  const item = await Item.findById(itemId);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  // Fetch canteen details using canteenName
  const canteen = await Canteen.findOne({ canteenName });
  if (!canteen) {
    return res.status(404).json({ message: "Canteen not found" });
  }

  const newOrder = new Order({
    userId,
    canteenId: canteen._id, // Use the canteen ID fetched from the database
    itemId,
    itemName: item.itemName, // Add itemName
    itemQuantity,
    totalAmount,
    payment,
    status,
    canteenName: canteen.canteenName, // Add canteenName
  });

  try {
    // Save the new order
    const savedOrder = await newOrder.save();

    // Add the order to the canteen's orders array
    canteen.orders.push(savedOrder._id);
    await canteen.save();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving order", error });
  }
});

module.exports = {
  createOrder,
};
