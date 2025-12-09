const express = require('express')
const router = express.Router()
const { getDashboard } = require('../controllers/dashboardController')

// router.get('/', requireAuth, getDashboard)

router.get('/', getDashboard)

module.exports = router
