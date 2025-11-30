const Transaction = require('../models/transactionModel')

const getDashboard = async (req, res) => {
  try {
    // Example stats
    const transactions = await Transaction.find({ user: req.user._id }) // if auth
    res.json({
      income: 100,
      expenses: 42500,
      goal: {
        title: 'Buy a car',
        monthProgress: 13300,
        monthTarget: 120000,
        totalSaved: 3500,
        totalTarget: 8000,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getDashboard }
