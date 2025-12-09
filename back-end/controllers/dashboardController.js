const Analytics = require("../models/analyticsModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");

// Helpers to get month-year keys
function getMonthYear() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}_${year}`;
}

function getPreviousMonthYear() {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}_${year}`;
}

const getDashboard = async (req, res) => {
  try {
    //  Fetch logged-in user's profile
    const user = await User.findById(req.user._id).select("name email");

    // Fetch analytics
    const analyticals = await Analytics.findOne({ userId: req.user._id });

    // Calculate income
    const totalIncomeFromIncomeCategory = (
      await Category.findOne({
        name: "Income",
        userId: req.user._id,
        mm_yyyy: getMonthYear(),
      })
    )?.amountSpent;
    // get expenses from all categories except Income
    const categories = await Category.find({
      userId: req.user._id,
      mm_yyyy: getMonthYear(),
      name: { $ne: "Income" },
    });
    let totalExpenses = 0;
    categories.forEach((cat) => {
      totalExpenses += cat.amountSpent;
    });
    const analyticalOverview = {
      income: totalIncomeFromIncomeCategory || 0,
      expenses: totalExpenses,
      savings: 0, // you can replace with your calculation
    };

    // Build expenditure overview dataset
    const expenditureOverview = [];
    const categoriesNames = await Category.find({
      userId: req.user._id,
    }).distinct("name");

    for (const name of categoriesNames) {
      const currentCategory = await Category.findOne({
        name,
        mm_yyyy: getMonthYear(),
        userId: req.user._id,
      });
      if (currentCategory) {
        expenditureOverview.push({
          title: name,
          previous:
            (
              await Category.findOne({
                name,
                mm_yyyy: getPreviousMonthYear(),
                userId: req.user._id,
              })
            )?.amountSpent || 0,
          current: currentCategory.amountSpent || 0,
        });
      }
    }

    // Static goal data (replace with DB if needed)// it was before but now takes from mongo db
    const goals = [
      {
        title: "Buy a car",
        totalSaved: 300999,
        totalTarget: 8000,
        periodData: {
          week: { progress: 500, target: 1000 },
          month: { progress: 1500, target: 2000 },
          year: { progress: 7000, target: 12000 },
        },
      },
    ];

    // Static upcoming bills (replace with DB if needed)
    const upcomingBills = [
      {
        deadline: "3 days",
        date: "18.11.2025",
        name: "Spotify",
        due: "€5.85",
        status: "ok",
      },
      {
        deadline: "1 day",
        date: "14.11.2025",
        name: "Netflix",
        due: "€13.50",
        status: "ok",
      },
      {
        deadline: "1 day ago",
        date: "14.11.2025",
        name: "Laundromat",
        due: "€2.87",
        status: "late",
      },
    ];

    // ✅ SEND EVERYTHING (including user info!)
    res.json({
      user: {
        name: user?.name,
        email: user?.email,
      },
      ...analyticalOverview,
      expenditureOverview,
      goals,
      upcomingBills,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboard };
