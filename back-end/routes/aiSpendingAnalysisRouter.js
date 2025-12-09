const express = require("express");
const router = express.Router();

const {
  getAnalysisPercentage,
  getWastefulCategoryPercentage,
} = require("../controllers/aiSpendingAnalysis");
// GET duplicate analysis percentage — GET /api/ai-spending-analysis/duplicates-percentage
router.get("/percentage", getAnalysisPercentage);
// GET wasteful category percentage — GET /api/ai-spending-analysis/wasteful-category-percentage
router.get("/cat-percent", getWastefulCategoryPercentage);

module.exports = router;
