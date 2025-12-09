const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

// PROTECTED ROUTES
router.use(requireAuth);

router.get("/", getGoals);
router.post("/", createGoal);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

module.exports = router;
