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
      }
    ],
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
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Preparing", "Ready", "Delivered"],
      default: "Pending",
    },
    orderPlacedAt: {
      type: Date,
      default: Date.now, 
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model("Order", orderSchema);
