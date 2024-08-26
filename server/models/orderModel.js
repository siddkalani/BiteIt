const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    canteenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Canteen",
      // required: true if canteen ID will sometimes be used
    },
    canteenName: {
      type: String,
      required: true, // Recommend making this required if canteen ID is optional
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    itemQuantity: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    payment: {
      type: Number,
      default: 0, // 0 -> not done, 1 -> payment done
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    orderPlacedAt: {
      type: Date,
      default: Date.now, // Optional, since timestamps include createdAt
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Order", orderSchema);
