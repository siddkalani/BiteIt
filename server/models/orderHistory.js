const mongoose = require("mongoose");

const orderHistorySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    canteenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Canteen",
      // required: true,
    },
    canteenName: {
      type: String,
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
      // required: true,
    },
    itemName: {
      type: String,

      // required: true,
    },
    itemQuantity: {
      type: Number,
      required: true,
    },
    itemImage: {
      type: String,
      //   required: true,
    },
    totalAmount: {
      type: Number,
      // required: true,
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
