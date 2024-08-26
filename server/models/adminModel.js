const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    canteenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Canteen",
      required: true,
    },
    otp: {
      type: String,
      required: true, // Ensure this is required
    },
    tokens: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
