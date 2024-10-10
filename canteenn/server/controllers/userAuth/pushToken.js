// controllers/userController.js
const User = require("../../models/userModel");

const postPushToken = async (req, res) => {
  try {
    const { userId, token } = req.body;

    // Check if both userId and token are provided
    if (!userId || !token) {
      return res.status(400).json({ message: "userId and token are required" });
    }

    // Validate userId format if it needs to be an ObjectId
    //   if (!mongoose.Types.ObjectId.isValid(userId)) {
    //     return res.status(400).json({ message: "Invalid userId format" });
    //   }

    // Find the user by userId
    let user = await User.findOne({ _id: userId });

    if (user) {
      // Update existing token
      user.pushToken = token;
      await user.save();
      res.status(200).json({ message: "Push token updated successfully" });
    } else {
      // Handle case where user is not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating push token:", error);
    res.status(500).json({ message: "Failed to update push token" });
  }
};

const getPushToken = async (req, res) => {
  try {
    const { id } = req.params; // Ensure this is _id or another unique field
    const user = await User.findById(id); // Use findById if querying by _id

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ pushToken: user.pushToken });
  } catch (error) {
    console.error("Error fetching push token:", error);
    res.status(500).json({ message: "Failed to fetch push token" });
  }
};

module.exports = { postPushToken, getPushToken };
