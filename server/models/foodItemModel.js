const mongoose = require("mongoose");

const foodItemSchema = mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    itemIncredients: {
      type: String,
      required: true,
    },
    itemImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FoodItem", foodItemSchema);
