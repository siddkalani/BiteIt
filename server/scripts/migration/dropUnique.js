// dropPhoneIndex.js

const mongoose = require("mongoose");
const dotenv=require("dotenv").config()

// Replace with your actual MongoDB connection string
const mongoURI = process.env.CONNECTION_STRING; // Update with your connection string

async function dropPhoneIndex() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    // Make sure to replace 'users' with your actual collection name
    await db.collection("users").dropIndex("phone_1");
    console.log("Unique index on phone field dropped successfully.");

    // Close the connection
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error dropping index:", error);
    // Optionally disconnect if there's an error
    await mongoose.disconnect();
  }
}

// Execute the function
dropPhoneIndex();
