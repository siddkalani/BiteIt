const asyncHandler = require("express-async-handler");
const User = require("../../../models/userModel"); // Updated to use User model
const bcrypt = require("bcryptjs");
const randomString = require("randomstring");
const { sendOTPEmail } = require("../../../services/authService");

const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Email not found." });
  }

  // Check if the user is verified
  if (!user.isVerified) {
    return res.status(400).json({ message: "Please verify your email first." });
  }

  // Generate OTP and hash it
  const otp = randomString.generate({ length: 5, charset: 'numeric' });
  const salt = await bcrypt.genSalt(10);
  user.otp = await bcrypt.hash(otp, salt); // Store hashed OTP
  user.otpExpires = Date.now() + 15 * 60 * 1000; // 15 minutes expiry time
  await user.save();

  // Send OTP to email
  await sendOTPEmail(user.name, email, otp);

  res.status(200).json({
    message: "OTP has been sent to your email.",
  });
});

module.exports = { requestPasswordReset };
