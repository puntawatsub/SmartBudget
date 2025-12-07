import mongoose from "mongoose";

const incomeSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  income: Number,
  expenses: Number,
  balance: Number,
  savings: Number,
});

export default mongoose.model("Income", incomeSchema);
