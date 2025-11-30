const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  return token;
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_REFRESH,
    { expiresIn: "7d" }
  );
  return refreshToken;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
