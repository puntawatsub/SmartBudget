import mongoose from 'mongoose'

const incomeSchema = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  income: Number,
  expenses: Number,
  balance: Number,
  savings: Number,
})

export default mongoose.model('Income', incomeSchema)
