const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
