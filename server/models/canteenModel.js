const mongoose = require("mongoose");

const canteenSchema = new mongoose.Schema(
  {
    isOnline:{
     type:Boolean ,
     default: false,
    },
    canteenName: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Canteen", canteenSchema);
