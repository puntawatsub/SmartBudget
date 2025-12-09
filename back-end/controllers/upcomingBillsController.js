const Bill = require('../models/upcomingBillsModel')

// GET ALL BILLS FOR LOGGED-IN USER
const getUpcomingBills = async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.user._id }).sort({ date: 1 })
    res.json(bills)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// CREATE NEW BILL
const createUpcomingBill = async (req, res) => {
  try {
    const { name, due, date, deadline } = req.body

    if (!name || !due || !date) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const bill = await Bill.create({
      name,
      due,
      date,
      deadline,
      userId: req.user._id, // assign logged-in user
    })

    res.status(201).json(bill)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE BILL (only for logged-in user)
const updateUpcomingBill = async (req, res) => {
  try {
    const bill = await Bill.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!bill) return res.status(404).json({ message: 'Bill not found' })
    res.json(bill)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE BILL (only for logged-in user)
const deleteUpcomingBill = async (req, res) => {
  try {
    const deletedBill = await Bill.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    })
    if (!deletedBill) return res.status(404).json({ message: 'Bill not found' })
    res.json({ message: 'Bill deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getUpcomingBills,
  createUpcomingBill,
  updateUpcomingBill,
  deleteUpcomingBill,
}
