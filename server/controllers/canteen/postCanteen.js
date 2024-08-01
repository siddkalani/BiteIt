const asyncHandler = require("express-async-handler");
const Canteen = require("../../models/canteenModel");

// Create a new canteen -> /canteen/add
const createCanteen = asyncHandler(async (req, res) => {
  const { canteenName } = req.body;

  if (!canteenName) {
    return res.status(400).json({ message: "Canteen name is required" });
  }

  // Check if canteen name already exists
  const existingCanteen = await Canteen.findOne({ canteenName });
  if (existingCanteen) {
    return res.status(400).json({ message: "Canteen name already exists" });
  }

  const newCanteen = new Canteen({ canteenName });

  try {
    const savedCanteen = await newCanteen.save();
    res.status(201).json({ message: "Canteen created successfully", canteen: savedCanteen });
  } catch (error) {
    res.status(500).json({ message: "Error creating canteen", error: error.message });
  }
});

module.exports = { createCanteen };
