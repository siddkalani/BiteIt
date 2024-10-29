// controllers/foodItemController.js
const FoodItem = require('../../models/foodItemModel');

const updateFoodItemStatus = async (req, res) => {
  try {
    const { itemId, isOnline } = req.body; // Extract itemId and new status from request body

    const foodItem = await FoodItem.findById(itemId);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    // Update the 'isOnline' status
    foodItem.isOnline = isOnline;
    await foodItem.save();

    const io = req.app.get("io"); // Get the io instance

    // Emit socket event based on the new status
    if (isOnline) {
      io.emit("foodItemOnline", foodItem);
    } else {
      io.emit("foodItemOffline", foodItem);
    }


    res.status(200).json({ message: 'Food item status updated', foodItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  updateFoodItemStatus,
};
