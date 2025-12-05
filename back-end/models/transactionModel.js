const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  merchant: {
    type: String,
    required: true,
  },
  category: {
    categoryName: {
      type: String,
      required: true,
    },
    categoryColor: {
      type: String,
      required: true,
    },
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Transaction = mongoose.model("Transactions", transactionSchema);

module.exports = Transaction;
