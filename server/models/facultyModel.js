const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String },
  phone: { type: String },
  isVerified: { type: Boolean, default: false },
  otp: { type: String }, // for OTP verification
  otpExpires: { type: Date } },
  {
    timestamps: true,
  }

);

module.exports = mongoose.model("Faculty", facultySchema);
