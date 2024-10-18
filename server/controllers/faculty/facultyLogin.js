const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const Faculty = require("../../models/facultyModel"); // Assuming you have a Faculty model
const asyncHandler = require("express-async-handler");

// Google OAuth2 client setup
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Faculty login controller
const facultyLogin = asyncHandler(async (req, res) => {
  const { email } = req.body; // Change from token to email

  try {
    // Check if the faculty exists in the database
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(404).json({ success: false, message: "You are not a faculty." }); // Updated message
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { user: { id: faculty._id, email: faculty.email } }, // Payload
      process.env.ACCESSTOKEN_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiry
    );

    // Send the token and faculty ID in the response
    res.json({
      success: true,
      message: "Login successful",
      facultyId: faculty._id,
      token: jwtToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = { facultyLogin };
