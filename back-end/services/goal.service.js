const Goal = require("../models/goal.model");

const calcProgress = (saved, target) => {
  if (!target || target <= 0) return 0;
  return Math.min(100, Math.round((saved / target) * 100));
};

exports.getAllGoals = async () => {
  return Goal.find().sort({ createdAt: -1 });
};

exports.createGoal = async ({ title, target, saved, deadline }) => {
  const numTarget = Number(target);
  const numSaved = Number(saved);

  const goal = new Goal({
    title,
    target: numTarget,
    saved: numSaved,
    deadline,
    progress: calcProgress(numSaved, numTarget),
  });

  return goal.save();
};

exports.updateGoal = async (id, { title, target, saved, deadline }) => {
  const existing = await Goal.findById(id);
  if (!existing) return null;

  if (title !== undefined) existing.title = title;
  if (target !== undefined) existing.target = Number(target);
  if (saved !== undefined) existing.saved = Number(saved);
  if (deadline !== undefined) existing.deadline = deadline;

  existing.progress = calcProgress(existing.saved, existing.target);

  return existing.save();
};

exports.deleteGoal = async (id) => {
  return Goal.findByIdAndDelete(id);
};
