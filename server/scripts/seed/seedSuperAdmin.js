const mongoose = require('mongoose');
const User = require('../../models/userModel');  // Path to your User model
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB...');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

async function createSuperAdmin() {
  try {
    const superAdminExists = await User.findOne({ email: process.env.SUPER_ADMIN_EMAIL });

    if (!superAdminExists) {
      const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10);
      const superAdmin = new User({
        name: 'Super Admin',
        email: process.env.SUPER_ADMIN_EMAIL,
        password: hashedPassword,
        role: 'superadmin',
        isVerified: true
      });

      await superAdmin.save();
      console.log('Super Admin created successfully!');
    } else {
      console.log('Super Admin already exists.');
    }
  } catch (error) {
    console.error('Error creating Super Admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createSuperAdmin();
