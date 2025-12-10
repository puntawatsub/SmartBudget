const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true, // Prevent duplicate emails
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // For password reset
    resetToken: String, // token for password reset
    resetTokenExpiry: Date, // token expiration date
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
