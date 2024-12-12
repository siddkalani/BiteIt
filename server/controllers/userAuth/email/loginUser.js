const asyncHandler = require("express-async-handler");
const User = require("../../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../../../utils/token")

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  if (!user.isVerified) {
    return res.status(400).json({ message: "Account not verified. Please verify your email." });
  }

  if (user.role === "admin") {
    return res.status(200).json({ message: "Admin account found. Please use OTP for login." });
  }

  // Use the token helper functions
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set the refresh token as an HTTP-only cookie with a 1-month expiration
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
  });

  // Define the response data according to the user role
  const responseData = {
    role: user.role,
    name: user.name,
    id: user._id,
  };

  // Send response with the same pattern as before
  res.status(200).json({
    message: "Login successful",
    refreshToken: refreshToken,
    token: accessToken,
    data: responseData,
  });
});


const adminLoginWithOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email." });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Only admins can log in with OTP." });
  }

  const isOtpValid = await bcrypt.compare(otp, user.otp);

  if (!isOtpValid) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  const token = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set the refresh token as an HTTP-only cookie with a 1-month expiration
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
  });

  res.status(200).json({
    message: "Successful",
    token: token,
    refreshToken: refreshToken,
    data: { role: user.role, name: user.name, id: user._id , 
      canteenId: user.canteenId._id, 
      canteenName: user.canteenId.canteenName, 
    },
  });
});


module.exports = { loginUser, adminLoginWithOtp };

