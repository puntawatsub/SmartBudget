const model = require("../config/gemini");
const Analytics = require("../models/analyticsModel");
const Category = require("../models/categoryModel");
const Transaction = require("../models/transactionModel");

function getMonthYear(d = new Date()) {
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}_${year}`;
}

const getAnalysisPercentage = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Count all transactions for the user in current month
    const totalCount = await Transaction.countDocuments({
      userId,
      date: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      },
    });

    if (totalCount === 0) {
      return res.status(200).json({
        duplicatePercentage: 0,
        message: "No transactions found for this user",
      });
    }

    // Count transactions marked as duplicate
    const duplicateCount = await Transaction.countDocuments({
      userId,
      wastefulAnalysis: "Duplicates",
      date: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      },
    });

    const duplicatePercentage = (duplicateCount / totalCount) * 100;

    const totalInefficientsCount = await Transaction.countDocuments({
      userId,
      wastefulAnalysis: "Inefficients",
      date: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      },
    });

    const inefficentPercentage = (totalInefficientsCount / totalCount) * 100;

    const categories = await Category.find({
      userId: req.user._id,
      mm_yyyy: getMonthYear(),
      name: { $ne: "Income" },
    });
    let totalExpenses = 0;
    categories.forEach((cat) => {
      totalExpenses += cat.amountSpent;
    });

    return res.status(200).json({
      duplicatePercentage: Number(duplicatePercentage.toFixed(2)),
      inefficentPercentage: Number(inefficentPercentage.toFixed(2)),
      totalSpendings: totalExpenses || 0,
    });
  } catch (error) {
    console.error("Error calculating duplicate percentage:", error);
    return res.status(500).json({
      message: "Server error calculating duplicate percentage",
    });
  }
};

// Get category spending analysis percentages in wastefulCategory field
const getWastefulCategoryPercentage = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const totalExpenses = 10000; // replace with real total if needed

    const result = await Transaction.aggregate([
      {
        $match: {
          userId,
          wastefulCategory: { $exists: true, $ne: null }, // exclude missing/null categories
        },
      },
      {
        $group: {
          _id: "$wastefulCategory",
          totalAmount: { $sum: { $abs: "$amount" } }, // sum absolute amount
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalAmount: 1,
          percentage: {
            $multiply: [{ $divide: ["$totalAmount", totalExpenses] }, 100],
          },
        },
      },
    ]);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error calculating wasteful category percentages:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getWastefulTransactions = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const transactions = await Transaction.find(
      {
        userId,
        wastefulAnalysis: { $in: ["Inefficients", "Duplicates"] }, // filter for the two values
      },
      {
        date: 1,
        merchant: 1,
        amount: 1,
        wastefulAnalysis: 1,
        _id: 0, // optional, remove _id if you don't want it
      }
    ).sort({ date: -1 }); // optional: sort by most recent first

    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching wasteful transactions:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAISuggestions = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const analytics = await Analytics.findOne({ userId });

    if (!analytics || !analytics.aIAnalysis) {
      const transactions = await Transaction.find({
        userId,
        date: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
      }).lean();
      const text = (
        await model(
          `Provide personalized spending analysis and suggestions for the user based on their transaction history. Focus on identifying wasteful spending patterns, duplicate expenses, and inefficiencies. Offer actionable recommendations to help the user optimize their budget and reduce unnecessary expenditures. Format the response in a clear and concise manner, no bold, italic, or any special formatting, just plain text, also no enter/return/new line, not in markdown format. Based on the following data: ${JSON.stringify(
            transactions
          )}`
        )
      ).text;
      analytics.aIAnalysis = `${text}`;
      await analytics.save();
    }
    return res.status(200).send(analytics.aIAnalysis);
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  getAnalysisPercentage,
  getWastefulCategoryPercentage,
  getWastefulTransactions,
  getAISuggestions,
};
