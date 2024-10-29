const { generateAccessToken } = require("../../../utils/token");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../../../models/userModel"); // Import the User model

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Get refresh token from cookie

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found. Please log in again." });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.REFRESHTOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired refresh token. Please log in again." });
    }

    const user = await User.findById(decoded.id); // Make sure User is defined
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken(user);

    res.status(200).json({
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
    });
  });
});

module.exports = refreshAccessToken