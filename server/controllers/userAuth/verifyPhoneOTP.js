// // const asyncHandler = require("express-async-handler");
// // const User = require("../../models/userModel");
// // const Admin = require("../../models/adminModel");
// // const bcrypt = require("bcrypt");

// // // POST -> /user/verify-otp
// // const verifyOtp = asyncHandler(async (req, res) => {
// //   let { phone, otp, name } = req.body;

// //   // Validate request data
// //   if (!phone || !otp) {
// //     return res.status(400).json({ error: "Phone number and OTP are required" });
// //   }
// //   if (!phone.startsWith("+91")) {
// //     phone = `+91${phone}`;
// //   }

// //   try {
// //     // Check if the phone number exists in the Admin collection
// //     const admin = await Admin.findOne({ phone });

// //     if (admin) {
// //       return res.status(200).json({ message: "Admin found" });
// //     }

// //     if (admin) {
// //       // Verify OTP for admin
// //       if (!admin.otp) {
// //         return res.status(400).json({ error: "Admin OTP is not set" });
// //       }

// //       const isOtpValid = await bcrypt.compare(otp, admin.otp);

// //       if (!isOtpValid) {
// //         return res.status(400).json({ error: "Invalid OTP" });
// //       }

// //       admin.otp = undefined;
// //       await admin.save();

// //       return res.status(200).json({
// //         message: "Admin verified successfully! Now you're in the admin panel.",
// //       });
// //     } else {
// //       const user = await User.findOne({ phone });

// //       if (!user) {
// //         return res.status(400).json({ error: "Invalid phone number" });
// //       }

// //       if (!user.otp || !otp) {
// //         return res.status(400).json({ error: "OTP is required" });
// //       }

// //       if (user.otpExpires < Date.now()) {
// //         return res.status(400).json({ error: "OTP expired" });
// //       }

// //       const isOtpValid = await bcrypt.compare(otp, user.otp);

// //       if (!isOtpValid) {
// //         return res.status(400).json({ error: "Invalid OTP" });
// //       }

// //       // Clear the OTP fields
// //       user.otp = undefined;
// //       user.otpExpires = undefined;
// //       user.isVerified = true;

// //       if (!user.name) {
// //         if (!name) {
// //           return res
// //             .status(400)
// //             .json({ error: "Name is required for new users" });
// //         }
// //         user.name = name;
// //       }

// //       await user.save();

// //       return res
// //         .status(200)
// //         .json({ message: "Phone number verified successfully!" });
// //     }
// //   } catch (error) {
// //     console.error("OTP verification failed:", error);
// //     return res.status(500).json({ message: "OTP verification failed" });
// //   }
// // });

// // module.exports = verifyOtp;

const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const Admin = require("../../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
