const Analytics = require('../models/analyticsModel')
const Category = require('../models/categoryModel')

// const getDashboard = async (req, res) => {
//   try {
//     // Example stats
//     const transactions = await Transaction.find({ user: req.user._id }) // if auth
//     res.json({
//       income: 102222220,
//       expenses: 42500,
//       goal: {
//         title: 'Buy a car',
//         monthProgress: 13300,
//         monthTarget: 120000,
//         totalSaved: 3500,
//         totalTarget: 8000,
//       },
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: 'Server error' })
//   }
// }

// module.exports = { getDashboard }
// controllers/dashboardController.js

// controllers/dashboardController.js

// const getDashboard = async (req, res) => {
//   try {
//     // Top-level keys for AnalyticalOverview
//     const analyticalOverview = {
//       income: 5000,
//       expenses: 3200,
//       savings: 1800,
//     }

//     // Data for ExpenditureOverview component
//     const expenditureOverview = [
//       { title: 'Groceries', previous: 300, current: 400, max: 500 },
//       { title: 'Transport', previous: 200, current: 300, max: 500 },
//       { title: 'Eating Out', previous: 250, current: 360, max: 500 },
//       { title: 'Shopping', previous: 180, current: 400, max: 500 },
//       { title: 'Subscriptions', previous: 100, current: 140, max: 500 },
//       { title: 'Utilities', previous: 220, current: 310, max: 500 },
//     ]

//     // Data for GoalCard component
//     const goals = [
//       {
//         title: 'Buy a car',
//         totalSaved: 3500,
//         totalTarget: 8000,
//         periodData: {
//           week: { progress: 500, target: 1000 },
//           month: { progress: 1500, target: 2000 },
//           year: { progress: 7000, target: 12000 },
//         },
//       },
//     ]

//     // Data for UpcomingBills component
//     const upcomingBills = [
//       {
//         deadline: '3 days',
//         date: '18.11.2025',
//         name: 'Spotify',
//         due: '€5.85',
//         status: 'ok',
//       },
//       {
//         deadline: '1 day',
//         date: '14.11.2025',
//         name: 'Netflix',
//         due: '€13.50',
//         status: 'ok',
//       },
//       {
//         deadline: '1 day ago',
//         date: '14.11.2025',
//         name: 'Laundromat',
//         due: '€2.87',
//         status: 'late',
//       },
//     ]

//     // Send single object with all top-level fields
//     res.json({
//       ...analyticalOverview,
//       expenditureOverview,
//       goals,
//       upcomingBills,
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: 'Server error' })
//   }
// }

function getMonthYear() {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${month}_${year}`
}

function getPreviousMonthYear() {
  const d = new Date()
  d.setMonth(d.getMonth() - 1)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${month}_${year}`
}

// module.exports = { getDashboard }
// controllers/dashboardController.js
const getDashboard = async (req, res) => {
  try {
    // AnalyticalOverview data
    // const analyticalOverview = {
    //   income: 53999900,
    //   expenses: 3111111100,
    //   savings: 1800,
    //   // balance: 1800, // optional, can calculate frontend if needed
    // };
    const analyticals = await Analytics.findOne({ userId: req.user._id })
    const totalIncomeFromIncomeCategory = (
      await Category.findOne({
        name: 'Income',
        userId: req.user._id,
        mm_yyyy: getMonthYear(),
      })
    )?.amountSpent
    // get expenses from all categories except Income
    const categories = await Category.find({
      userId: req.user._id,
      mm_yyyy: getMonthYear(),
      name: { $ne: 'Income' },
    })
    let totalExpenses = 0
    categories.forEach((cat) => {
      totalExpenses += cat.amountSpent
    })
    const analyticalOverview = {
      income: totalIncomeFromIncomeCategory ? totalIncomeFromIncomeCategory : 0,
      expenses: totalExpenses,
      savings: 0,
    }

    // ExpenditureOverview data
    // const expenditureOverview = [
    //   { title: "Groceries", previous: 20, current: 400, max: 500 },
    //   { title: "Transport", previous: 200, current: 300, max: 500 },
    //   { title: "Eating Out", previous: 250, current: 360, max: 500 },
    //   { title: "Shopping", previous: 180, current: 400, max: 500 },
    //   { title: "Subscriptions", previous: 100, current: 140, max: 500 },
    //   { title: "Utilities", previous: 220, current: 310, max: 500 },
    // ];
    const expenditureOverview = [] // Placeholder for dynamic data
    const categoriesNames = await Category.find({
      userId: req.user._id,
    }).distinct('name')
    for (const name of categoriesNames) {
      const currentCategory = await Category.findOne({
        name,
        mm_yyyy: getMonthYear(),
        userId: req.user._id,
      })
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
            )?.amountSpent || 0, // Placeholder, implement previous month logic if needed
          current: currentCategory.amountSpent || 0,
        })
      }
    }

    // GoalCard data
    const goals = [
      {
        title: 'Buy a car',
        totalSaved: 300999,
        totalTarget: 8000,
        periodData: {
          week: { progress: 500, target: 1000 },
          month: { progress: 1500, target: 2000 },
          year: { progress: 7000, target: 12000 },
        },
      },
    ]

    // UpcomingBills data
    const upcomingBills = [
      {
        deadline: '3 days',
        date: '18.11.2025',
        name: 'Spotify',
        due: '€5.85',
        status: 'ok',
      },
      {
        deadline: '1 day',
        date: '14.11.2025',
        name: 'Netflix',
        due: '€13.50',
        status: 'ok',
      },
      {
        deadline: '1 day ago',
        date: '14.11.2025',
        name: 'Laundromat',
        due: '€2.87',
        status: 'late',
      },
    ]

    // Send a single object with top-level analyticalOverview fields
    res.json({
      ...analyticalOverview, // spreads income, expenses, savings, balance
      expenditureOverview,
      goals,
      upcomingBills,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getDashboard }
