const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
    min: 0,
  },
  amountSpent: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  mm_yyyy: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
