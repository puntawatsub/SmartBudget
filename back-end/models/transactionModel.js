const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
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
    wastefulAnalysis: {
      type: String,
      required: false,
    },
    wastefulCategory: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transactions", transactionSchema);

module.exports = Transaction;
