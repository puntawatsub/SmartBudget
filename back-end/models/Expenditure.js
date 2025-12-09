import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  category: String,
  previous: Number,
  current: Number,
  max: Number,
});

export default mongoose.model("Expense", expenseSchema);
