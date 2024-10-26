const asyncHandler = require("express-async-handler");
const User = require("../../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  if (!user.isVerified) {
    return res.status(400).json({ message: "Account not verified. Please verify your email." });
  }

  // Check if the user is an admin
  if (user.role === "admin") {
    return res.status(200).json({ message: "Admin account found. Please use OTP for login." });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role }, // Payload
    process.env.ACCESSTOKEN_SECRET, // Secret key from environment variables
    { expiresIn: "1h" } // Token expiration time
  );

  let responseData;
  if (user.role === "faculty") {
    responseData = { role: "faculty", name: user.name, id: user._id };
  } else if (user.role === "user") {
    responseData = { role: "user", name: user.name, id: user._id };
  } else {
    responseData = { role: "superadmin", name: user.name, id: user._id };
  }

  res.status(200).json({
    message: "Login successful",
    token: token,
    data: responseData,
  });
});

// 2FA login function for admin users
const adminLoginWithOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email." });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Only admins can log in with OTP." });
  }

  const isOtpValid = await bcrypt.compare(otp, user.otp); // Use bcrypt.compare to verify the OTP

  if (!isOtpValid) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.ACCESSTOKEN_SECRET, 
    { expiresIn: "1h" } 
  );

  res.status(200).json({
    message: "Successful",
    token: token,
    data: { role: user.role, name: user.name, id: user._id },
  });
});

module.exports = { loginUser, adminLoginWithOtp };

