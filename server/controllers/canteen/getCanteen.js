const asyncHandler = require("express-async-handler");
const Canteen = require("../../models/canteenModel");

// Get all canteens -> /canteen/get
const getAllCanteens = asyncHandler(async (req, res) => {
  try {
    const canteens = await Canteen.find();
    res.status(200).json(canteens);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching canteens", error: error.message });
  }
});

const getCanteen = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const canteens = await Canteen.findById(id);
    res.status(200).json({ canteens: canteens });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching canteens", error: error.message });
  }
});

module.exports = {
  getAllCanteens,getCanteen
};
