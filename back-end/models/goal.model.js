const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    target: {
      type: Number,
      required: true,
      min: 0,
    },
    saved: {
      type: Number,
      required: true,
      min: 0,
    },
    deadline: {
      type: Date,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },
    monthlyTarget: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

goalSchema.pre("save", function (next) {
  if (this.target > 0) {
    this.progress = Math.min(100, Math.round((this.saved / this.target) * 100));
  } else {
    this.progress = 0;
  }
  next();
});

module.exports = mongoose.model("Goal", goalSchema);
