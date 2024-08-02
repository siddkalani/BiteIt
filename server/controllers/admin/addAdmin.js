const asyncHandler = require("express-async-handler");
const Admin = require("../../models/adminModel");
const bcrypt = require("bcrypt");

// POST -> /admin/add
const addAdmin = asyncHandler(async (req, res) => {
  const { adminName, phone, canteenId, otp } = req.body;

  if (!adminName || !phone || !canteenId || !otp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingAdmin = await Admin.findOne({ phone });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this phone number already exists" });
    }

    const hashedOTP = await bcrypt.hash(otp, 10);

    const newAdmin = new Admin({
      adminName,
      phone,
      canteenId,
      otp: hashedOTP,
    });

    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin added successfully", admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding admin", error });
  }
});

module.exports = addAdmin;
