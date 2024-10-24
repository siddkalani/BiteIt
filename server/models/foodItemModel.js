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
    image: {
      type: String,
    },
    itemQuantity: {
      type: Number,
    },
    isOnline:{
      type:Boolean,
      default:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FoodItem", foodItemSchema);
