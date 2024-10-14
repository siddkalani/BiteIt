const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const { sendPhoneOTP } = require("../../services/authService"); // Adjust path as necessary

// POST -> /user/resend/phone/otp
const resendOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  try {
    // Find the user by phone number
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Generate a new OTP
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    // Hash the OTP
    const hashedOTP = await bcrypt.hash(otp, 10);

    // Update user record with new OTP and expiry time
    user.otp = hashedOTP;
    user.otpExpires = Date.now() + 120000; // OTP expires in 2 minutes
    await user.save();

    // Send the new OTP via SMS
    await sendPhoneOTP(phone, otp);

    res.status(200).json({ message: "New OTP sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to resend OTP" });
  }
});

module.exports = resendOtp;
