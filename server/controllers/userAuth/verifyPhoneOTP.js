const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

//POST -> /user/verify-otp
const verifyOtp = asyncHandler(async (req, res) => {
  const { phone, otp, name } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    if (!user.otp || !otp) {
      return res.status(400).json({ error: "OTP is required" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ error: "OTP expired" });
    }

    const isOtpValid = await bcrypt.compare(otp, user.otp);

    if (!isOtpValid) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Clear the OTP fields
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;

    if (!user.name) {
      if (!name) {
        return res
          .status(400)
          .json({ error: "Name is required for new users" });
      }
      // First-time registration, update user with name
      user.name = name;
    }

    await user.save();

    if (
      phone === process.env.ADMIN_PHONE_1 ||
      phone === process.env.ADMIN_PHONE_2
    ) {
      res.status(200).json({ message: "Now you're in the admin panel" });
    } else {
      res.status(200).json({ message: "Phone number verified successfully!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "OTP verification failed" });
  }
});

module.exports = verifyOtp;
