const mongoose = require("mongoose");

const userOrderHistorySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    canteenName: {
      type: String,
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
    itemImage: {
      type: String,
    //   required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0, // 0 -> not delivered , 1 -> delivered
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

module.exports = mongoose.model("UserOrderHistory", userOrderHistorySchema);
