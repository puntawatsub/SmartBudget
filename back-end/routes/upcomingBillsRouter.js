const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
const {
  getUpcomingBills,
  createUpcomingBill,
  updateUpcomingBill,
  deleteUpcomingBill,
} = require('../controllers/upcomingBillsController')

// PROTECTED ROUTES
router.use(requireAuth)

router.get('/', getUpcomingBills) // Get all bills for logged-in user
router.post('/', createUpcomingBill) // Add a new bill
router.put('/:id', updateUpcomingBill) // Update a bill by ID
router.delete('/:id', deleteUpcomingBill) // Delete a bill by ID

module.exports = router
