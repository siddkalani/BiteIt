const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    categoryImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
