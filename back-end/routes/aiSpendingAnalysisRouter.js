const express = require("express");
const router = express.Router();

const {
  getAnalysisPercentage,
  getWastefulCategoryPercentage,
  getWastefulTransactions,
  getAISuggestions,
} = require("../controllers/aiSpendingAnalysis");
// GET duplicate analysis percentage — GET /api/ai-spending-analysis/duplicates-percentage
router.get("/percentage", getAnalysisPercentage);
// GET wasteful category percentage — GET /api/ai-spending-analysis/wasteful-category-percentage
router.get("/cat-percent", getWastefulCategoryPercentage);
// GET wasteful transactions — GET /api/ai-spending-analysis/wasteful-transactions
router.get("/wasteful-transactions", getWastefulTransactions);
// GET AI spending suggestions — GET /api/ai-spending-analysis/ai-suggestions
router.get("/ai-suggestions", getAISuggestions);

module.exports = router;
