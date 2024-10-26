const asyncHandler = require("express-async-handler");
const User = require("../../../models/userModel"); // Updated to use User model
const bcrypt = require("bcrypt");

const verifyOtpAndResetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (newPassword.length < 5) {
    return res.status(400).json({ message: "New password must be at least 5 characters long." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email." });
  }

  const isOtpValid = await bcrypt.compare(otp, user.otp);
  if (!isOtpValid || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  
  user.password = hashedPassword;
  user.otp = undefined; 
  user.otpExpires = undefined; 
  await user.save();

  res.status(200).json({
    message: "Password reset successfully.",
  });
});

module.exports = { verifyOtpAndResetPassword };
