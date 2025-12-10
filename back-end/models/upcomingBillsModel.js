const mongoose = require("mongoose");

const upcomingBillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    due: { type: Number, required: true }, // amount
    date: { type: Date, required: true }, // store as Date instead of string
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { type: String, default: "ok" }, // ok / late
  },
  { timestamps: true }
);

const UpcomingBill = mongoose.model("UpcomingBill", upcomingBillSchema);

module.exports = UpcomingBill;
