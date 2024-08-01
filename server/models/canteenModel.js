const mongoose = require("mongoose");

const canteenSchema = new mongoose.Schema(
  {
    canteenName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Canteen", canteenSchema);
