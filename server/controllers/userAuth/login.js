const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const { sendPhoneOTP } = require("../../services/authService");
const Admin = require("../../models/adminModel");

// POST -> /user/login
const userLogin = asyncHandler(async (req, res) => {
  let { phone } = req.body;

  if (!phone.startsWith("+91")) {
    phone = `+91${phone}`;
  }

  try {
    const admin = await Admin.findOne({ phone });

    if (admin) {
      res
        .status(200)
        .json({ message: "Admin found. Proceed to OTP verification." });
    } else {
      const user = await User.findOne({ phone });
      const otp = otpGenerator.generate(5, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      const hashedOTP = await bcrypt.hash(otp, 10);

      if (user) {
        user.otp = hashedOTP;
        user.otpExpires = Date.now() + 600000; // OTP expires in 10 minutes
        // user.otpExpires = Date.now() + 120000; // OTP expires in 2 minutes
        await user.save();
      } else {
        await User.create({
          phone,
          otp: hashedOTP,
          otpExpires: Date.now() + 120000,
        });
      }

      await sendPhoneOTP(phone, otp);

      res.status(200).json({ message: "OTP sent successfully!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

module.exports = userLogin;
