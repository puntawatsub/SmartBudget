// models/transactionModel.js
const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    enum: ['Luxury', 'Lifestyle', 'Self-Development', 'Necessity', 'Fixed'],
  },
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Transaction', transactionSchema)
