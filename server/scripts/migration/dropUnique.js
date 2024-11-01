// addIsOnlineField.js

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Canteen = require('../../models/canteenModel');

// Replace with your actual MongoDB connection string
const mongoURI = process.env.CONNECTION_STRING; // Update with your connection string

async function addIsOnlineField() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Define the new isOnline field for all existing documents
    const result = await Canteen.updateMany({}, { $set: { isOnline: false } });
    console.log(`${result.modifiedCount} documents updated: isOnline field added successfully.`);

    // Close the connection
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error adding isOnline field:", error);
    // Optionally disconnect if there's an error
    await mongoose.disconnect();
  }
}

// Execute the function
addIsOnlineField();
