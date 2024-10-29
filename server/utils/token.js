const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESSTOKEN_SECRET,
    { expiresIn: "30s" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.REFRESHTOKEN_SECRET,
    { expiresIn: "1m" }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
