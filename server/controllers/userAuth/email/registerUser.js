// *** FACULTY REGISTRATION 
const asyncHandler = require("express-async-handler");
const User = require("../../../models/userModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const { sendOTPEmail } = require("../../../services/authService");

const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password, phone } = req.body;

  try {
    // Check if the email exists in the database with a predefined role
    let user = await User.findOne({ email });

    if (!user) {
      // Block registration if the email is not predefined as 'faculty' or 'admin'
      return res.status(400).json({
        message: "Email is not authorized to register. Only faculty and pre-authorized users can register.",
      });
    } else if (user.role === "admin") {
      // Block registration if the role is 'admin'
      return res.status(400).json({
        message: "Registration is not allowed for admins. Admin accounts must be predefined.",
      });
    } else if (user.role !== "faculty") {
      // Block registration if the role is neither 'faculty' nor 'admin'
      return res.status(400).json({
        message: "Only faculty roles are authorized to register.",
      });
    } else if (user.isVerified) {
      // If the email already exists and is verified, return an error
      return res.status(400).json({
        message: "Account already created for this email.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP and hash it
    const otp = randomString.generate({ length: 5, charset: "numeric" });
    user.otp = await bcrypt.hash(otp, salt); // Store hashed OTP
    user.otpExpires = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes

    // Update the user record with additional details
    user.name = name;
    user.password = hashedPassword;
    user.phone = phone;
    await user.save();

    // Send OTP to the email
    await sendOTPEmail(name, email, otp);
    console.log("OTP email sent successfully");

    // Respond to client
    res.status(200).json({
      message: "Account creation successful, OTP sent to your email for verification.",
      role: user.role,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "An error occurred during registration. Please try again later." });
  }
});

module.exports = { registerUser };



//*** ALL ROLES USER REGISTRATION ***

// const asyncHandler = require("express-async-handler");
// const User = require("../../../models/userModel");
// const bcrypt = require("bcrypt");
// const randomString = require("randomstring");
// const { sendOTPEmail } = require("../../../services/authService");

// const registerUser = asyncHandler(async (req, res) => {
//   const { email, name, password, phone } = req.body;

//   // Find the user by email to check if it's allowed and determine the role
//   let user = await User.findOne({ email });

// if (user && user.role === "admin" && !user.isVerified) {
//     return res.status(400).json({
//       message: "Admin registration is not allowed. Admin accounts must be predefined.",
//     });
//   }

//   // Check if the email exists and retrieve the role or default to "user"
//   if (!user) {
//     user = new User({
//       email,
//       role: "user", // default role if email isn't pre-defined as faculty or admin
//       isVerified: false,
//     });
//   } else if (user.isVerified) {
//     // If the email already exists and is verified, return an error
//     return res.status(400).json({ message: "Account already created for this email." });
//   }

//   // Hash the password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   // Generate OTP and hash it
//   const otp = randomString.generate({ length: 5, charset: "numeric" });
//   user.otp = await bcrypt.hash(otp, salt); // Store hashed OTP
//   user.otpExpires = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes

//   // Update the user record with additional details
//   user.name = name;
//   user.password = hashedPassword;
//   user.phone = phone;
//   await user.save();

//   // Send OTP to the email
//   await sendOTPEmail(name, email, otp);

//   res.status(200).json({
//     message: "Account creation successful, OTP sent to your email for verification.",
//     role: user.role,
//   });
// });

// module.exports = { registerUser };



