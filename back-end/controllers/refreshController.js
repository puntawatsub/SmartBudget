const {
  generateRefreshToken,
  verifyRefreshToken,
  hashToken,
} = require("../lib/tokens");
const Refresh = require("../models/refreshTokenModel");
const User = require("../models/userModel");

const refresh = async (req, res) => {
  let errorCode = 0;
  const oldRefreshToken = req.signedCookies.refreshToken;
  console.log(oldRefreshToken);

  if (!oldRefreshToken) {
    errorCode = 400;
    throw new Error("No cookie found");
  }

  try {
    const userId = await verifyRefreshToken(oldRefreshToken);
    console.log(userId);
    if (!userId) {
      errorCode = 400;
      throw new Error("Invalid token");
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      errorCode = 400;
      throw new Error("Invalid user");
    }
    // generate refresh token
    const refreshToken = generateRefreshToken(user);
    // delete previous tokens
    await Refresh.deleteMany({ userId: user._id });
    res.clearCookie("refreshToken");
    // send refresh token as cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      path: "/api/refresh",
      signed: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // create refresh token in schema
    const newRefreshToken = new Refresh({
      userId: user._id,
      tokenHashed: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await newRefreshToken.save();

    const token = generateRefreshToken(user);

    res.status(200).json({
      message: "Refresh successful",
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    if (errorCode !== 0) {
      res.clearCookie("refreshToken");
      return res.status(errorCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Server error" });
      console.log(error);
    }
  }
};

module.exports = {
  refresh,
};
