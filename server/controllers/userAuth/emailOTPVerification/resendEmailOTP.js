const asyncHandler = require("express-async-handler");
const Faculty = require("../../../models/facultyModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const { sendOTPEmail } = require("../../../services/authService");

const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const faculty = await Faculty.findOne({ email });
  
  if (!faculty) {
    return res.status(400).json({ message: "Email not found." });
  }

  if (!faculty.isVerified) {
    return res.status(400).json({ message: "Please verify your email first." });
  }

  // Generate OTP
  const otp = randomString.generate({ length: 6, charset: 'numeric' });
  const salt = await bcrypt.genSalt(10);
  faculty.otp = await bcrypt.hash(otp, salt); // Store hashed OTP
  faculty.otpExpires = Date.now() + 15 * 60 * 1000; // 15 mins expiry
  await faculty.save();

  // Send OTP to email
  await sendOTPEmail(faculty.name, email, otp);

  res.status(200).json({
    message: "OTP has been sent to your email.",
  });
});



module.exports = { requestPasswordReset };
