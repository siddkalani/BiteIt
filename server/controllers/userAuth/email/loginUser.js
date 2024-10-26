const asyncHandler = require("express-async-handler");
const User = require("../../../models/userModel");
const bcrypt = require("bcrypt");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  if (!user.isVerified) {
    return res.status(400).json({ message: "Account not verified. Please verify your email." });
  }

  let responseData;
  if (user.role === "admin") {
    responseData = { role: "admin", name: user.name, id: user._id };
  } else if (user.role === "faculty") {
    responseData = { role: "faculty", name: user.name, id: user._id };
  } else if(user.role === "user"){
    responseData = { role: "user", name: user.name, id: user._id };
  }else{
    responseData = { role: "superadmin", name: user.name, id: user._id };
  }

  res.status(200).json({
    message: "Login successful",
    data: responseData,
  });
});

module.exports = { loginUser };
