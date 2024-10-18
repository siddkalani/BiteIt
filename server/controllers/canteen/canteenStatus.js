// controllers/canteenController.js

const CanteenModel = require('../../models/canteenModel');

// Get canteen status
const getCanteenStatus = async (req, res) => {
  try {
    const canteenId = req.query.canteenId; // Assuming canteen ID is passed as a query parameter
    const canteen = await CanteenModel.findById(canteenId);

    if (!canteen) {
      return res.status(404).json({ message: "Canteen not found." });
    }

    res.status(200).json({ isOnline: canteen.isOnline });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch canteen status." });
  }
};

// Update canteen status
const updateCanteenStatus = async (req, res) => {
  const { isOnline } = req.body;

  try {
    const canteenId = req.admin.canteenId; // Assuming you have the canteen ID from the admin context
    await CanteenModel.findByIdAndUpdate(canteenId, { isOnline });

    res.status(200).json({ message: "Canteen status updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to update canteen status." });
  }
};

module.exports = {
  getCanteenStatus,
  updateCanteenStatus,
};
