const mongoose = require('mongoose');
require('dotenv').config();

// Load the FoodItem model
const FoodItem = require('../../models/foodItemModel'); // Adjust the path to your model file

const updateFoodItems = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Update all records to set isOnline = true
    const result = await FoodItem.updateMany(
      { isOnline: { $ne: true } }, // Condition: Only update records where isOnline is not true
      { $set: { isOnline: true } } // Set isOnline to true
    );

    console.log(`Updated ${result.nModified} food items to set isOnline to true.`);
  } catch (error) {
    console.error('Error updating food items:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

updateFoodItems();
