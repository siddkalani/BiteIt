
const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const { sendOtp_phone } = require('../userAuth/verifyPhoneOTP')
const {sendPhoneOTP} = require('../../services/authService')

//POST -> /user/send-otp
const userLogin = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  try {
    const user = await User.findOne({ phone });
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    }); // Generate OTP

    const hashedOTP = await bcrypt.hash(otp, 10);

    if (user) {
      // User exists, update the OTP
      user.otp = hashedOTP;
      user.otpExpires = Date.now() + 120000; // OTP expires in 2 minutes
      await user.save();
    } else {
      // New user, create a new entry with OTP
      await User.create({
        phone,
        otp: hashedOTP,
        otpExpires: Date.now() + 120000,
      });
    }

    // Send OTP via phone
    await sendPhoneOTP(phone, otp);

    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

module.exports = userLogin;

