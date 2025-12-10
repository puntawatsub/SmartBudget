const jwt = require('jsonwebtoken')
const Refresh = require('../models/refreshTokenModel')
const crypto = require('crypto')

const generateAccessToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  )
  return token
}

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_REFRESH,
    { expiresIn: '7d' }
  )
  return refreshToken
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

const verifyRefreshToken = async (token) => {
  try {
    console.log(`Token: ${token}`)
    const { id } = jwt.verify(token, process.env.JWT_REFRESH)
    if (!id) {
      return false
    }
    const hashedToken = await Refresh.findOne({ userId: id })
    console.log(hashedToken)
    if (hashedToken.tokenHashed === hashToken(token)) {
      console.log('equals')
      return id
    }
    return false
  } catch (error) {
    console.log(error)
  }
  return false
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  verifyRefreshToken,
}
