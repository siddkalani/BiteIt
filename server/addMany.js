const mongoose = require('mongoose');
require('dotenv').config();

const Teacher = require('./models/facultyModel'); 
const predefinedEmails = [
 
  { email: 'shreya.shedge@somaiya.edu' },
  { email: 'siddharth.kalani@somaiya.edu' }
];

const populateTeachers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if records already exist to prevent duplicates
    for (const faculty of predefinedEmails) {
      const exists = await Teacher.findOne({ email: faculty.email });
      if (!exists) {
        const newFaculty = new Teacher(faculty);
        await newFaculty.save();
        console.log(`Added: ${faculty.email}`);
      } else {
        console.log(`Already exists: ${faculty.email}`);
      }
    }

    console.log('Population complete');
  } catch (error) {
    console.error('Error populating teachers:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

populateTeachers();
