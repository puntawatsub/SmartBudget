const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  totalIncome: {
    type: Number,
    required: true,
    default: 0,
  },
  totalExpense: {
    type: Number,
    required: true,
    default: 0,
  },
  totalSavings: {
    type: Number,
    required: true,
    default: 0,
  },
  aIAnalysis: {
    type: Object,
    required: false,
  },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;
