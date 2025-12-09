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

module.exports = {
  getAnalysisPercentage,
  getWastefulCategoryPercentage,
};
