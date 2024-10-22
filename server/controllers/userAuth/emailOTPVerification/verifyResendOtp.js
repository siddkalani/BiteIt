const asyncHandler = require("express-async-handler");
const Faculty = require("../../../models/facultyModel");
const bcrypt = require("bcrypt");

// Verify OTP and reset password
const verifyOtpAndResetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Find faculty member by email
  const faculty = await Faculty.findOne({ email });

  if (!faculty) {
    return res.status(400).json({ message: "Invalid email." });
  }

  // Check if OTP is valid and hasn't expired
  const isOtpValid = await bcrypt.compare(otp, faculty.otp);
  if (!isOtpValid || faculty.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  // Hash the new password and update the faculty record
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  
  faculty.password = hashedPassword;
  faculty.otp = undefined; // Clear OTP
  faculty.otpExpires = undefined; // Clear OTP expiration
  await faculty.save();

  res.status(200).json({
    message: "Password reset successfully.",
  });
});

// Export the function for use in routes
module.exports = { verifyOtpAndResetPassword };
