// scripts/resetPassword.js

const mongoose = require('mongoose');
const User = require('../models/user');  // Path to your User model
const bcrypt = require('bcryptjs');

// MongoDB Connection
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB...');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

async function resetPassword(userEmail, newPassword) {
  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log('User not found.');
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    console.log(`Password for user ${userEmail} has been reset.`);
  } catch (error) {
    console.error('Error resetting password:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Pass the email and new password as arguments when running the script
const email = process.argv[2];
const newPassword = process.argv[3];

if (email && newPassword) {
  resetPassword(email, newPassword);
} else {
  console.log('Please provide an email and a new password.');
}
