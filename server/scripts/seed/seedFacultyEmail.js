const mongoose = require("mongoose");
const User = require("../../models/userModel"); 
const dotenv = require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const predefinedFacultyEmails = [
  
    { email: 'manishashedge78703@gmail.com' },
   
];

const seedFacultyEmails = async () => {
    try {
      // Extract email strings from the predefined faculty emails
      const emailStrings = predefinedFacultyEmails.map(faculty => faculty.email);
  
      // Check for existing faculty emails to avoid duplicates
      const existingFacultyEmails = await User.find({
        email: { $in: emailStrings },
        role: "faculty",
      }).select("email");
  
      const existingEmailsSet = new Set(existingFacultyEmails.map(user => user.email));
  
      // Filter out emails that are already in the database
      const newFacultyUsers = predefinedFacultyEmails
        .filter(faculty => !existingEmailsSet.has(faculty.email)) // Use faculty.email for filtering
        .map(faculty => ({
          email: faculty.email,
          role: "faculty",
          isVerified: false, // Set false initially; will be verified on registration
        }));
  
      // Bulk insert new faculty emails if any
      if (newFacultyUsers.length > 0) {
        await User.insertMany(newFacultyUsers);
        console.log("Faculty emails seeded successfully");
      } else {
        console.log("All predefined faculty emails are already seeded.");
      }
    } catch (error) {
      console.error("Error seeding faculty emails:", error);
    } finally {
      mongoose.connection.close();
    }
  };
  

seedFacultyEmails();

