// const asyncHandler = require("express-async-handler");
// const User = require("../../models/facultyModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const {sendOtp_email} = require('./verifyEmailOTP')

// // Utility function to generate OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
// };

// //POST -> /user/login
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: "Please register yourself first." });
//     }

//     // Check if the user is verified by OTP
//     if (!user.isVerified) {
//       // Generate a new OTP
//       const otp = generateOTP();

//       // Hash the OTP before saving it to the database
//       const hashedOtp = await bcrypt.hash(otp, 10);

//       // Set OTP and its expiry time (e.g., 10 minutes)
//       user.otp = hashedOtp;
//       user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
//       await user.save();

//       // Send the OTP email
//       await sendOtp_email(user.name, user.email, otp);

//       return res.status(401).json({
//         message: "Please verify your email. An OTP has been sent to your email.",
//       });
//     }

//     // Check the password
//     const matchPass = await bcrypt.compare(password, user.password);
//     if (!matchPass) {
//       return res.status(401).json({ message: "Login credentials are incorrect" });
//     }

//     // Create JWT access token
//     const accessToken = jwt.sign(
//       {
//         user: {
//           name: user.name,
//           email: user.email,
//           user_id: user.id,
//         },
//       },
//       process.env.TOKEN_SECRET,
//       { expiresIn: "30m" }
//     );

//     res.status(200).json({ message: "Logged In", accessToken });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = loginUser;
const asyncHandler = require("express-async-handler");
const Faculty = require("../../../models/facultyModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginFaculty = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Find the faculty by email
    const faculty = await Faculty.findOne({ email });

    // Check if the faculty account exists
    if (!faculty) {
      return res.status(400).json({ message: "Account not found." });
    }

    // Check if the email is verified
    if (!faculty.isVerified) {
      return res.status(400).json({ message: "Please verify your email first." });
    }

    // Check if the password matches
    const matchPassword = await bcrypt.compare(password, faculty.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Incorrect credentials." });
    }

    // Create JWT token
    const token = jwt.sign({ id: faculty._id }, process.env.ACCESSTOKEN_SECRET, {
      expiresIn: "3h",
    });

    return res.status(200).json({
      message: "Login Successfull!",
      token,
      user: {
        id: faculty._id,
        name: faculty.name,
      },
    });

    // Respond with success and token
  } catch (error) {
    console.error("Error logging in faculty:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = { loginFaculty };
