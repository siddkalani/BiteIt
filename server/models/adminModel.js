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
      // required: true, // eng - 1234, manag - 5678,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
