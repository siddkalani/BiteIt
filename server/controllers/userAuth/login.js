
//********* PHONE VERIFICATION BY OTP ***********
const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const { sendOtp_email } = require("./verifyEmailOTP");
const { sendOtp_phone } = require("./verifyPhoneOTP");
const otpGenerator = require("otp-generator");
const { sendVerifyEmail } = require("../../services/authVerifyService");

//POST -> /user/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      // throw new Error("User already exists with this email id");
      return res
        .status(400)
        .json({ message: "User already exists with this email id" });
    }
    // const userExists = await User.findOne({ phoneNo });
    // if (userExists) {
    //   throw new Error("User already exists with this phone no");
    // }
    const hashedPassword = await bcrypt.hash(password, 10);



    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    }); //PHONE -OTP

    const hashedOTP = await bcrypt.hash(otp, 10);

    const newUser = await User.create({
      name,
      phone,
      password: hashedPassword,
      otp: hashedOTP, // Store the OTP in the database
      otpExpires: Date.now() + 3600000, // OTP expires in 1 hour
    });

    if (newUser) {
      // sendOtp_email(name,email,otp)
      // sendOtp_phone(name, phoneNo, otp, hashedOTP);
      await sendVerifyEmail(name, email, newUser._id);
      res.status(200).json({ success: "Otp sent successfully!" });
      console.log("Otp sent successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "User creation failed" });
  }
});

module.exports = registerUser;
