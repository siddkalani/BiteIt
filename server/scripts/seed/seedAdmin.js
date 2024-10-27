const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../../models/userModel");
const dotenv = require("dotenv").config();

// Check if connection string is provided
if (!process.env.CONNECTION_STRING) {
  console.error("Error: CONNECTION_STRING is not defined in .env file");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if unable to connect
  });

const addAdmin = async (name, phone, email, password, role, otp, canteenId = "admin") => {
  try {
    // Check if an admin with the email already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log(`Admin with email ${email} already exists`);
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Hash the admin OTP
    const hashedAdminOtp = await bcrypt.hash(otp, 10);

    // Create a new admin
    const admin = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
      isVerified: true,
      otp: hashedAdminOtp, // Store the hashed OTP
      canteenId
    });

    // Save the new admin
    await admin.save();
    console.log(`${role} added successfully: ${name}, ${otp}`);
  } catch (error) {
    console.error("Error adding admin:", error);
  }
};

// Function to add multiple admins and close connection
const runScript = async () => {
  try {
    // Adding superadmin
    // await addAdmin("Shreya Shedge", "9892489468", "shedgeshreyy03@gmail.com", "12345", "superadmin", "12345");

    // Adding regular admin
    await addAdmin("Siddharth Kalani", "8591604354", "siddharthkalani6@gmail.com", "12345", "admin", "12345", "66ab684e8f90abfbe51a1ae2");
  } finally {
    // Close the database connection once done
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0); // Ensure the script exits
  }
};

// Run the script
runScript();
