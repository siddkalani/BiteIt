const asyncHandler = require("express-async-handler");
const User = require("../../../models/userModel");
const Admin = require("../../../models/adminModel");

// POST -> /user/verify/otp
const verifyOtp = asyncHandler(async (req, res) => {
  let { phone, otp, name } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ error: "Phone number and OTP are required" });
  }

  if (!phone.startsWith("+91")) {
    phone = `+91${phone}`;
  }

  try {
    const admin = await Admin.findOne({ phone });

    if (admin) {
      // Verify OTP for admin
      if (!admin.otp) {
        return res.status(400).json({ error: "Admin OTP is not set" });
      }

      const isOtpValid = await bcrypt.compare(otp, admin.otp);

      if (!isOtpValid) {
        return res.status(400).json({ error: "Invalid OTP" });
      }

      // Clear OTP field

      await admin.save();

      // Generate JWT token for admin
      const token = jwt.sign(
        { id: admin._id },
        process.env.ACCESSTOKEN_SECRET,
        {
          expiresIn: "3h",
        }
      );

      return res.status(200).json({
        message: "Admin phone verified successfully!",
        token,
        admin: {
          id: admin._id,
          name: admin.adminName, // Return adminName instead of name
        },
      });
    } else {
      const user = await User.findOne({ phone });

      if (!user) {
        return res.status(400).json({ error: "Invalid phone number" });
      }

      if (!user.otp || !otp) {
        return res.status(400).json({ error: "OTP is required" });
      }

      if (user.otpExpires < Date.now()) {
        return res.status(400).json({ error: "OTP expired" });
      }

      const isOtpValid = await bcrypt.compare(otp, user.otp);

      if (!isOtpValid) {
        return res.status(400).json({ error: "Invalid OTP" });
      }

      // Clear OTP fields
      user.otp = undefined;
      user.otpExpires = undefined;
      user.isVerified = true;

      if (!user.name) {
        if (!name) {
          return res
            .status(400)
            .json({ error: "Name is required for new users" });
        }
        user.name = name;
      }

      await user.save();

      // Generate JWT token for user
      const token = jwt.sign({ id: user._id }, process.env.ACCESSTOKEN_SECRET, {
        expiresIn: "3h",
      });

      return res.status(200).json({
        message: "User phone verified successfully!",
        token,
        user: {
          id: user._id,
          name: user.name,
        },
      });
    }
  } catch (error) {
    console.error("OTP verification failed:", error);
    return res.status(500).json({ message: "OTP verification failed" });
  }
});

module.exports = verifyOtp;



// const asyncHandler = require("express-async-handler");
// const Faculty = require("../../../models/facultyModel"); // Faculty model import
// const Admin = require("../../../models/adminModel"); // Admin model import
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // POST -> /user/verify/email-otp
// const verifyEmailOTP = asyncHandler(async (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({ error: "Email and OTP are required" });
//   }

//   try {
//     // Check if the request is for an admin
//     const admin = await Admin.findOne({ email });

//     if (admin) {
//       // Verify OTP for admin
//       if (!admin.otp) {
//         return res.status(400).json({ error: "Admin OTP is not set" });
//       }

//       const isOtpValid = await bcrypt.compare(otp, admin.otp);

//       if (!isOtpValid) {
//         return res.status(400).json({ error: "Invalid OTP" });
//       }

//       // Generate JWT token for admin
//       const token = jwt.sign({ id: admin._id }, process.env.ACCESSTOKEN_SECRET, {
//         expiresIn: "3h",
//       });

//       return res.status(200).json({
//         message: "Admin email verified successfully!",
//         token,
//         admin: {
//           id: admin._id,
//           name: admin.adminName,
//         },
//       });
//     }

//     // If not admin, proceed with Faculty verification
//     const faculty = await Faculty.findOne({ email });

//     if (!faculty) {
//       return res.status(400).json({ message: "Invalid email" });
//     }

//     if (faculty.isVerified) {
//       return res.status(400).json({ message: "Account already verified." });
//     }

//     // Check if the OTP matches and hasn't expired
//     const matchOTP = await bcrypt.compare(otp, faculty.otp);

//     if (!matchOTP || faculty.otpExpires < Date.now()) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     // Mark the faculty as verified and clear OTP fields
//     faculty.isVerified = true;
//     faculty.otp = undefined;
//     faculty.otpExpires = undefined;
//     await faculty.save();

//     res.status(200).json({ message: "Faculty email verified successfully." });
//   } catch (error) {
//     console.error("Email OTP verification failed:", error);
//     return res.status(500).json({ message: "Email OTP verification failed" });
//   }
// });

// module.exports = { verifyEmailOTP };
