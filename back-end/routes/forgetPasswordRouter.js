require('dotenv').config()

const express = require('express')
const router = express.Router()
const {
  forgotPassword,
  resetPassword,
} = require('../controllers/forgetPasswordController')

router.post('/', forgotPassword)
router.post('/reset-password/:token', resetPassword)

module.exports = router
