const mongoose = require("mongoose");

const orderHistorySchema = mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true, // Ensures every OrderHistory has a reference to the original Order
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    canteenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Canteen",
    },
    canteenName: {
      type: String,
      required: true,
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FoodItem",
        },
        itemName: {
          type: String,
        },
        itemQuantity: {
          type: Number,
        },
        itemImage: {
          type: String,
        },
      },
    ], // Array to store multiple ordered items
    totalAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Rejected",
        "Preparing",
        "Ready",
        "Delivered",
      ],
      default: "Pending",
    },
   payment:{
    type:Number,
    default:0
   },
    orderPlacedAt: {
      type: Date,
      default: Date.now,
    },
    deliveredAt: {
      type: Date, 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderHistory", orderHistorySchema);
