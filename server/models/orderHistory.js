const mongoose = require("mongoose");

const orderHistorySchema = mongoose.Schema(
  {
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
   
    orderPlacedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderHistory", orderHistorySchema);
