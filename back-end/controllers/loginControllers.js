const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
  generateRefreshToken,
  generateAccessToken,
  hashToken,
} = require('../lib/tokens')
const Refresh = require('../models/refreshTokenModel')
const crypto = require('crypto')

const createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' })

  try {
    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' })

    const token = generateRefreshToken(user)

    // generate refresh token
    const refreshToken = generateRefreshToken(user)
    // delete previous tokens
    const deleteToken = await Refresh.deleteMany({ userId: user._id })
    // send refresh token as cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/api/refresh',
      signed: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    // create refresh token in schema
    const newRefreshToken = new Refresh({
      userId: user._id,
      tokenHashed: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    await newRefreshToken.save()

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { username: user.username, email: user.email },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
    console.log(error)
  }
}

module.exports = { loginUser }
