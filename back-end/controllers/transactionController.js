const Transactions = require("../models/transactionModel");
const flattenObject = require("../lib/flattenObject");
const Analytics = require("../models/analyticsModel");
const Category = require("../models/categoryModel");

//csv
const exportTransactionsToCSV = require("../lib/exportCsv");
const { normalizeCategory } = require("../utils/normalizedCategory");
const {
  wastefulCategoryQuery,
} = require("../services/wastefulCategoryService");
const Settings = require("../models/settingModel");
//csv

// nst transactionSchema = new mongoose.Schema({
//   date: {
//     type: Date,
//     required: true,
//   },
//   merchant: {
//     type: String,
//     required: true,
//   },
//   category: {
//     categoryName: {
//       type: String,
//       required: true,
//     },
//     categoryColor: {
//       type: String,
//       required: true,
//     },
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
// userId as well
// });

function getMonthYear(d) {
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}_${year}`;
}

const createOne = async (req, res) => {
  try {
    const { date, merchant, category, amount } = req.body;
    const userId = req.user._id;
    const currency = (await Settings.findOne({ userId })).currency;

    if (!date || !merchant || !category || !amount) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const allTransactions = await Transactions.find({ userId }).lean();

    console.log(allTransactions);

    let temp = {};

    if (amount < 0) {
      const rawResponse = await wastefulCategoryQuery(
        merchant,
        amount,
        category.categoryName,
        date,
        currency,
        // all transactions of this user for context
        allTransactions
      );

      // Try to extract JSON from markdown fences
      console.log(typeof rawResponse);
      const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : rawResponse;
      if (process.env.DEBUG_GEMINI === "true") {
        console.log(jsonString);
      }
      let parsedCategory;
      try {
        parsedCategory = JSON.parse(jsonString);
      } catch (err) {
        return res
          .status(500)
          .json({ error: "Error parsing LLM JSON response." });
      }

      const normalizedCategory = normalizeCategory(parsedCategory);

      temp = {
        date,
        merchant,
        category: {
          categoryName: amount <= 0 ? category.categoryName : "Income",
          categoryColor: category.categoryColor,
        },
        amount,
        wastefulCategory: normalizedCategory.category,
        wastefulAnalysis: normalizedCategory.analysis,
        userId,
      };
    } else {
      temp = {
        date,
        merchant,
        category: {
          categoryName: amount <= 0 ? category.categoryName : "Income",
          categoryColor: category.categoryColor,
        },
        amount,
        userId,
      };
    }

    const newTransaction = new Transactions(temp);

    await newTransaction.save();

    const currentCategory = await Category.findOne({
      name: amount <= 0 ? category.categoryName : "Income",
      mm_yyyy: getMonthYear(new Date(date)),
      userId,
    });

    if (amount < 0) {
      const currentTotalExpenses = (await Analytics.findOne({ userId }))
        .totalExpense;
      await Analytics.findOneAndUpdate(
        { userId },
        { totalExpense: currentTotalExpenses + Math.abs(amount) }
      );
    } else {
      const currentTotalIncome = (await Analytics.findOne({ userId }))
        .totalIncome;
      await Analytics.findOneAndUpdate(
        { userId },
        { totalIncome: currentTotalIncome + amount }
      );
    }

    if (currentCategory) {
      currentCategory.amountSpent += Math.abs(amount);
      await currentCategory.save();
    } else {
      await Category.create({
        name: amount <= 0 ? category.categoryName : "Income",
        limit: 0,
        amountSpent: Math.abs(amount),
        userId,
        mm_yyyy: getMonthYear(new Date(date)),
      });
    }

    res.status(201).json(temp);
  } catch (err) {
    res
      .status(400)
      .json({ message: `Cannot create transaction: ${err.message}` });
  }
};

const getAll = async (req, res) => {
  try {
    const userId = req.user._id;
    const transactions = await Transactions.find({ userId });
    res.json(transactions);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Cannot get all transactions: ${err.message}` });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Id is required");
    }
    const userId = req.user._id;
    const transaction = await Transactions.findOne({ _id: id, userId });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(transaction);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Cannot get transaction by id: ${err.message}` });
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const body = flattenObject(req.body);
    if (!body) {
      throw new Error("Body is required");
    }
    if (body.userId) {
      throw new Error("Illegal request");
    }
    if (!id) {
      throw new Error("Id is required");
    }
    const userId = req.user._id;
    const transaction = await Transactions.findOneAndUpdate(
      { _id: id, userId },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    if (body.amount) {
      const analytics = await Analytics.findOne({ userId });
      let newTotalIncome = analytics.totalIncome;
      let newTotalExpense = analytics.totalExpense;

      const oldTransaction = await Transactions.findOne({ _id: id, userId });
      if (oldTransaction.amount < 0) {
        newTotalExpense -= Math.abs(oldTransaction.amount);
      } else {
        newTotalIncome -= oldTransaction.amount;
      }

      if (body.amount < 0) {
        newTotalExpense += Math.abs(body.amount);
      } else {
        newTotalIncome += body.amount;
      }

      await Analytics.findOneAndUpdate(
        { userId },
        { totalIncome: newTotalIncome, totalExpense: newTotalExpense }
      );
    }
    // update category amountSpent if category or amount changed
    if (body.category || body.amount) {
      const oldTransaction = await Transactions.findOne({ _id: id, userId });
      const oldCategory = await Category.findOne({
        name: oldTransaction.category.categoryName,
        mm_yyyy: getMonthYear(new Date(oldTransaction.date)),
        userId,
      });
      if (oldCategory) {
        oldCategory.amountSpent -= Math.abs(oldTransaction.amount);
        await oldCategory.save();
      }

      const newCategoryName =
        body["category.categoryName"] || oldTransaction.category.categoryName;
      const newAmount = body.amount || oldTransaction.amount;
      const newCategory = await Category.findOne({
        name: newCategoryName,
        mm_yyyy: getMonthYear(
          body["date"] ? new Date(body["date"]) : new Date(oldTransaction.date)
        ),
        userId,
      });
      if (newCategory) {
        newCategory.amountSpent += Math.abs(newAmount);
        await newCategory.save();
      } else {
        await Category.create({
          name: newCategoryName,
          limit: 0,
          amountSpent: Math.abs(newAmount),
          userId,
          mm_yyyy: getMonthYear(
            body["date"]
              ? new Date(body["date"])
              : new Date(oldTransaction.date)
          ),
        });
      }
    }
    res.json(transaction);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Cannot update transaction by id: ${err.message}` });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID not provided" });
    }
    const userId = req.user._id;
    const deletedTransaction = await Transactions.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!deletedTransaction) {
      return res
        .status(404)
        .json({ message: `Not deleted, transaction with id ${id} not found` });
    }
    if (deletedTransaction.amount < 0) {
      const currentTotalExpenses = (await Analytics.findOne({ userId }))
        .totalExpense;
      await Analytics.findOneAndUpdate(
        { userId },
        {
          totalExpense:
            currentTotalExpenses - Math.abs(deletedTransaction.amount),
        }
      );
    } else {
      const currentTotalIncome = (await Analytics.findOne({ userId }))
        .totalIncome;
      await Analytics.findOneAndUpdate(
        { userId },
        { totalIncome: currentTotalIncome - deletedTransaction.amount }
      );
    }
    // Also update category amountSpent
    const category = await Category.findOne({
      name: deletedTransaction.category.categoryName,
      mm_yyyy: getMonthYear(new Date(deletedTransaction.date)),
      userId,
    });
    if (category) {
      category.amountSpent -= Math.abs(deletedTransaction.amount);
      await category.save();
    }
    res.status(204).send();
  } catch (err) {
    res
      .status(500)
      .json({ message: `Cannot delete transaction by id: ${err.message}` });
  }
};

//csv
const exportCSV = async (req, res) => {
  try {
    const userId = req.user._id;
    const transactions = await Transactions.find({ userId });

    const csv = exportTransactionsToCSV(transactions);

    const fileName = `transactions_${getMonthYear(new Date())}.csv`;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({
      message: `Cannot export CSV: ${err.message}`,
    });
  }
};
//csv

module.exports = {
  createOne,
  getAll,
  getById,
  updateById,
  deleteById,

  //csv
  exportCSV,
};
