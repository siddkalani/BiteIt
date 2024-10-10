const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    foodItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
