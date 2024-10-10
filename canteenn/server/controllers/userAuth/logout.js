const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const Admin = require("../../models/adminModel");

// POST -> /user/logout
const logout = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Check if the token belongs to a User
    let user = await User.findOne({ tokens: token });
    if (user) {
      // Remove token from user's tokens array
      user.tokens = user.tokens.filter((t) => t !== token);
      await user.save();
      return res.status(200).json({ message: "Logout successful" });
    }

    // Check if the token belongs to an Admin
    let admin = await Admin.findOne({ tokens: token });
    if (admin) {
      // Remove token from admin's tokens array
      admin.tokens = admin.tokens.filter((t) => t !== token);
      await admin.save();
      return res.status(200).json({ message: "Logout successful" });
    }

    res.status(404).json({ message: "User or Admin not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { logout };
