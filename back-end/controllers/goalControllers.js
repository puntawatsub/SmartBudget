const Goal = require("../models/goal.model");

// GET ALL GOALS FOR USER
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE NEW GOAL
const createGoal = async (req, res) => {
  try {
    const { title, target, saved, deadline, monthlyTarget } =
      req.body;

    const goal = await Goal.create({
      title,
      target,
      saved,
      deadline,
      monthlyTarget,
      userId: req.user._id,
    });

    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE GOAL
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE GOAL
const deleteGoal = async (req, res) => {
  try {
    await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
