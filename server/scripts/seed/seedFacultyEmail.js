const mongoose = require("mongoose");
const User = require("../../models/userModel"); 
const dotenv = require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const predefinedFacultyEmails = [
    { email: 'shreya.shedge@somaiya.edu' },
    { email: 'siddharth.kalani@somaiya.edu' },
    { email: 'babaso@somaiya.edu' },
    { email: 'deepaksharma@somaiya.edu' },
    { email: 'manishpotey@somaiya.edu' },
    { email: 'jyoti.joglekar@somaiya.edu' },
    { email: 'udayjoshi@somaiya.edu' },
    { email: 'kavitakelkar@somaiya.edu' },
    { email: 'bharathihn@somaiya.edu' },
    { email: 'jyothirao@somaiya.edu' },
    { email: 'prasannashete@somaiya.edu' },
    { email: 'bhaktiraul@somaiya.edu' },
    { email: 'pradnyagothmare@somaiya.edu' },
    { email: 'rajaniaswani@somaiya.edu' },
    { email: 'prasadinipadwal@somaiya.edu' },
    { email: 'swatimali@somaiya.edu' },
    { email: 'neelammotwani@somaiya.edu' },
    { email: 'zaheedshaikh@somaiya.edu' },
    { email: 'poonambhogale@somaiya.edu' },
    { email: 'rohininair@somaiya.edu' },
    { email: 'sheetalpereira@somaiya.edu' },
    { email: 'smitasankhe@somaiya.edu' },
    { email: 'nirmalashinde@somaiya.edu' },
    { email: 'shweta.chachra@somaiya.edu' },
    { email: 'archana.gupta@somaiya.edu' },
    { email: 'gopal.s@somaiya.edu' },
    { email: 'swapnil.cp@somaiya.edu' },
    { email: 'vaibhav.vasani@somaiya.edu' },
    { email: 'abhishekbhaduria@somaiya.edu' },
    { email: 'jhnirmal@somaiya.edu' },
    { email: 'sudhagupta@somaiya.edu' },
    { email: 'samidhakulkarni@somaiya.edu' },
    { email: 'aratiphadke@somaiya.edu' },
    { email: 'rajashreedaryapurkar@somaiya.edu' },
    { email: 'sahanumante@somaiya.edu' },
    { email: 'kirtisawlani@somaiya.edu' },
    { email: 'makarandkulkarni@somaiya.edu' },
    { email: 'sushmakadge@somaiya.edu' },
    { email: 'seematalmale@somaiya.edu' },
    { email: 'aynaiksatam@somaiya.edu' },
    { email: 'shiladhande@somaiya.edu' },
    { email: 'deepajain@somaiya.edu' },
    { email: 'meghasharma@somaiya.edu' },
    { email: 'soniajoshi@somaiya.edu' },
    { email: 'nilesh.lakade@somaiya.edu' },
    { email: 'pragya.g@somaiya.edu' },
    { email: 'ankita.modi@somaiya.edu' },
    { email: 'inderjitsingh@somaiya.edu' },
    { email: 'anagha.raich@somaiya.edu' },
    { email: 'ameyanaik@somaiya.edu' },
    { email: 'rameshkarandikar@somaiya.edu' },
    { email: 'priyankapatil@somaiya.edu' },
    { email: 'chitramenon@somaiya.edu' },
    { email: 'abhijeet@somaiya.edu' },
    { email: 'muzammilahmed@somaiya.edu' },
    { email: 'algondadesai@somaiya.edu' },
    { email: 'santoshmani@somaiya.edu' },
    { email: 'yogeshthakkar@somaiya.edu' },
    { email: 'deepaliphalak@somaiya.edu' },
    { email: 'ravindrasalvi@somaiya.edu' },
    { email: 'deeptisaxena@somaiya.edu' },
    { email: 'nandinirai@somaiya.edu' },
    { email: 'rachanadesai@somaiya.edu' },
    { email: 'vinayakkharpude@somaiya.edu' },
    { email: 'jitendra.karekar@somaiya.edu' },
    { email: 'surenpatwardhan@somaiya.edu' },
    { email: 'shrikantchawade@somaiya.edu' },
    { email: 'archana.sharma@somaiya.edu' },
    { email: 'pushpendrarai@somaiya.edu' },
    { email: 'jitendrasatam@somaiya.edu' },
    { email: 'bharati.c@somaiya.edu' },
    { email: 'druman@somaiya.edu' },
    { email: 'anandbodhale@somaiya.edu' },
    { email: 'suwarna.s@somaiya.edu' },
    { email: 'animap@somaiya.edu' },
    { email: 'samina@somaiya.edu' },
    { email: 'pranoti@somaiya.edu' },
    { email: 'bhargavikaslikar@somaiya.edu' },
    { email: 'bharatikhedkar@somaiya.edu' },
    { email: 'arun.b@somaiya.edu' },
    { email: 'umang@somaiya.edu' },
    { email: 'kiran.thale@somaiya.edu' },
    { email: 's.langade@somaiya.edu' },
    { email: 'lavanya.s@somaiya.edu' },
    { email: 'sheba@somaiya.edu' },
    { email: 'ninad@somaiya.edu' },
    { email: 'kavitakumari.t@somaiya.edu' },
    { email: 'ashwini.sankhe@somaiya.edu' },
    { email: 'deepshree@somaiya.edu' },
    { email: 'isaq@somaiya.edu' },
    { email: 'midhya@somaiya.edu' },
    { email: 'sarika.d@somaiya.edu' },
    { email: 'anushri.t@somaiya.edu' },
    { email: 'shivani.d@somaiya.edu' },
    { email: 'kulkarni.k@somaiya.edu' },
    { email: 'abhijeet.p@somaiya.edu' },
    { email: 'o.g@somaiya.edu' },
    { email: 'payal.av@somaiya.edu' },
    { email: 'snehal.shinde@somaiya.edu' },
    { email: 'spj3@somaiya.edu' },
    { email: 'alice.c@somaiya.edu' },
    { email: 'shruti.javkar@somaiya.edu' },
   
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

