const asyncHandler = require("express-async-handler");
const Admin = require("../../models/adminModel");

// GET -> /admin/:phone
const getSingleAdmin = asyncHandler(async (req, res) => {
  const { phone } = req.params;

  try {
    const admin = await Admin.findOne({ phone });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching admin", error });
  }
});


// GET -> /admin/all
const getAllAdmins = asyncHandler(async (req, res) => {
    try {
      const admins = await Admin.find();
  
      res.status(200).json({ admins });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching admins", error });
    }
  });

module.exports = { getSingleAdmin, getAllAdmins };
