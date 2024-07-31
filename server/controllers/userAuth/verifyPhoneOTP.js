const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const { sendPhoneOTP } = require("../../services/authService");
const bcrypt = require("bcrypt");

const sendOtp_phone = asyncHandler(async (name, phoneNo, otp, hashedOTP) => {
  const otpExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

  const user = await User.findOneAndUpdate(
    { phoneNo },
    { otp: hashedOTP, otpExpires: otpExpires },
    { upsert: true, new: true }
  );

  if (!user) {
    throw new Error("User not found or failed to update");
  }

  sendPhoneOTP(name, phoneNo, otp);
});

const verifyPhoneOTP = asyncHandler(async (req, res) => {
  const { phoneNo, otp } = req.body;

  const user = await User.findOne({ phoneNo });

  if (!user) {
    return res.status(400).json({ error: "Invalid phone" });
  }

  if (user.isVerified) {
    return res.status(400).json({ error: "User already verified" });
  }

  const matchOTP = await bcrypt.compare(otp, user.otp);

  if (!matchOTP || user.otpExpires < Date.now()) {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.status(200).json({ success: "Phone Number verified successfully" });
});

module.exports = { verifyPhoneOTP, sendOtp_phone };
