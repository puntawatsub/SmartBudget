const express = require("express");
const router = express.Router();

const Goal = require("../models/goal.model");
const requireAuth = require("../middleware/requireAuth");

// Apply authentication middleware to all routes
router.use(requireAuth);

// CREATE — POST /api/goals
router.post("/", async (req, res) => {
  try {
    const goal = await Goal.create({ ...req.body, userId: req.user._id });
    console.log(goal);
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ALL — GET /api/goals
router.get("/", async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id });
    console.log(goals);
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE — PUT /api/goals/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { ...req.body },
      {
        new: true,
      }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE — DELETE /api/goals/:id
router.delete("/:id", async (req, res) => {
  try {
    await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
