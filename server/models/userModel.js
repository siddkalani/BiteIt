const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // Removes leading and trailing whitespace
    },
    phone: {
      type: String,
      sparse: true,
      match: /^[0-9]{10}$/, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, 
      trim: true,
      match: /^\S+@\S+\.\S+$/, 
    },
    password: {
      type: String,
      minlength: 5,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin", "faculty"],
      default: "user",
    },
    canteenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Canteen",
      required: function () {
        return this.role === "admin"; // Canteen ID is only required if the role is 'admin'
      },
    },
    token: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
      default: null, 
    },
    otpExpires: {
      type: Date, // Expiry time for OTP
      default: null,
    },
    pushToken: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false, 
    },

  },
  {
    timestamps: true, 
  }
);

// Method to check if the user is an admin
userSchema.methods.isAdmin = function () {
  return this.role === "admin";
};

// Method to check if the user is a super admin
userSchema.methods.isSuperAdmin = function () {
  return this.role === "superadmin";
};


module.exports = mongoose.model("User", userSchema);




// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema(
//   {
//     phone: {
//       type: String,
//       // required: true,
//     },
//     name: {
//       type: String,
//     },
//     token: {
//       type: String,
//       default: "",
//     },
//     otp: {
//       type: String,
//     },
//     otpExpires: {
//       type: Date,
//     },
//     pushToken: {
//       type: String,
//       // required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("User", userSchema);
