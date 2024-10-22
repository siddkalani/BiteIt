
// const asyncHandler = require("express-async-handler");
// const User = require("../../models/userModel");
// const bcrypt = require("bcrypt");
// const randomString = require("randomstring");
// const { sendOtp_email } = require("./emailOTPVerification/verifyEmailOTP");

// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user) {
//       if (user.isVerified) {
//         return res.status(400).json({ message: "User already exists with this email id" });
//       } else {
//         const otp = randomString.generate({ length: 4, charset: "numeric" });
//         user.otp = await bcrypt.hash(otp, 10);
//         user.otpExpires = Date.now() + 3600000; // OTP expires in 1 hour
//         await user.save();

//         await sendOtp_email(name, email, otp);
//         return res.status(200).json({ success: true, message: "Otp resent successfully!" });
//       }
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const otp = randomString.generate({ length: 4, charset: "numeric" });
//     const hashedOTP = await bcrypt.hash(otp, 10);

//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       otp: hashedOTP,
//       otpExpires: Date.now() + 3600000,
//     });

//     await sendOtp_email(name, email, otp);
//     res.status(200).json({ success: true, message: "Otp sent successfully!" });
//     console.log("Otp sent successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "User creation failed" });
//   }
// });

// module.exports = registerUser;



const asyncHandler = require("express-async-handler");
const Faculty = require("../../../models/facultyModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const { sendOTPEmail } = require("../../../services/authService");

const registerFaculty = asyncHandler(async (req, res) => {
  const { email, name, password, phone } = req.body;

  const faculty = await Faculty.findOne({ email });

  if (!faculty) {
    return res.status(400).json({ message: "Email not allowed to register." });
  }

  if (faculty.isVerified) {
    return res.status(400).json({ message: "Account already created for this email." });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Send OTP for email verification
  const otp = randomString.generate({ length: 5, charset: "numeric" });
  faculty.otp = await bcrypt.hash(otp, salt); // Store hashed OTP
  faculty.otpExpires = Date.now() + 15 * 60 * 1000; // 15 mins expiry

  // Update the faculty record with additional details
  faculty.name = name;
  faculty.password = hashedPassword;
  faculty.phone = phone;
  await faculty.save();

  await sendOTPEmail(name, email, otp); // Send OTP to the email

  res.status(200).json({
    message: "Account creation successful, OTP sent to your email for verification.",
  });
});

module.exports = { registerFaculty };
