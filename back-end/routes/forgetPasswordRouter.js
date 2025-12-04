require('dotenv').config()

const express = require('express')
const router = express.Router()
const {
  forgotPassword,
  resetPassword,
} = require('../controllers/forgetPasswordController')

// Use root path because app.js already mounts at '/api/forgot-password'
router.post('/', forgotPassword)
router.post('/reset-password/:token', resetPassword)

module.exports = router
