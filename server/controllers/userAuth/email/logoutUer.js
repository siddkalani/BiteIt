const asyncHandler = require("express-async-handler");

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged out successfully." });
  });
  
module.exports = logoutUser