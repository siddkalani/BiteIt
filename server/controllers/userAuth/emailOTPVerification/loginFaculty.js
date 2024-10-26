// const asyncHandler = require("express-async-handler");
// const Faculty = require("../../../models/facultyModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const loginFaculty = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   // Validate input
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required." });
//   }

//   try {
//     // Find the faculty by email
//     const faculty = await Faculty.findOne({ email });

//     // Check if the faculty account exists
//     if (!faculty) {
//       return res.status(400).json({ message: "Account not found." });
//     }

//     // Check if the email is verified
//     if (!faculty.isVerified) {
//       return res.status(400).json({ message: "Please verify your email first." });
//     }

//     // Check if the password matches
//     const matchPassword = await bcrypt.compare(password, faculty.password);
//     if (!matchPassword) {
//       return res.status(401).json({ message: "Incorrect credentials." });
//     }

//     // Create JWT token
//     const token = jwt.sign({ id: faculty._id }, process.env.ACCESSTOKEN_SECRET, {
//       expiresIn: "3h",
//     });

//     return res.status(200).json({
//       message: "Login Successfull!",
//       token,
//       user: {
//         id: faculty._id,
//         name: faculty.name,
//       },
//     });

//     // Respond with success and token
//   } catch (error) {
//     console.error("Error logging in faculty:", error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// });

// module.exports = { loginFaculty };


const asyncHandler = require("express-async-handler");
const Faculty = require("../../../models/facultyModel");
const Admin = require("../../../models/adminModel"); // Import Admin model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginFaculty = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Check if the email exists in the admin collection
    const admin = await Admin.findOne({ email });

    if (admin) {
      return res
        .status(200)
        .json({ message: "Admin found. Proceed to admin panel." });
    }

    // Find the faculty by email if not an admin
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
      message: "Login Successful!",
      token,
      user: {
        id: faculty._id,
        name: faculty.name,
      },
    });

  } catch (error) {
    console.error("Error logging in faculty:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = { loginFaculty };
