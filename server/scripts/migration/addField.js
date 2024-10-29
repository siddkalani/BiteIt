// migrations/addRefreshTokenField.js
const mongoose = require("mongoose");
const User = require("../../models/userModel");
const dotenv = require("dotenv").config() // Adjust the path as necessary

const uri = process.env.CONNECTION_STRING; 

const addRefreshTokenField = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Update all users to set refreshToken to null (or you can modify based on your requirements)
    const result = await User.updateMany({}, { $set: { refreshToken: null } });

    console.log(`${result.modifiedCount} users updated with refreshToken field.`);
  } catch (error) {
    console.error("Error updating users:", error);
  } finally {
    await mongoose.disconnect();
  }
};

addRefreshTokenField();
