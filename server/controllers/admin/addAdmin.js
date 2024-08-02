const asyncHandler = require("express-async-handler");
const Admin = require("../../models/adminModel");

// POST -> /admin/add
const addAdmin = asyncHandler(async (req, res) => {
  const { adminName, phone, canteenId, otp } = req.body;

  // Validate request body
  if (!adminName || !phone || !canteenId || !otp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if an admin with the same phone number already exists
    const existingAdmin = await Admin.findOne({ phone });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this phone number already exists" });
    }

    // Create a new admin
    const newAdmin = new Admin({
      adminName,
      phone,
      canteenId,
      otp, // Store OTP as plaintext for fixed OTPs or consider hashing if it's not fixed
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: "Admin added successfully", admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding admin", error });
  }
});

module.exports = addAdmin;
