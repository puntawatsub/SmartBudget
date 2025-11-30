const mongoose = require("mongoose");

const RefreshSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Signup",
    required: true,
  },
  tokenHashed: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, // TTL index here
  },
});

module.exports = mongoose.model("RefreshToken", RefreshSchema);
