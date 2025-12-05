const Transactions = require("../models/transactionModel");
const flattenObject = require("../lib/flattenObject");

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

const createOne = async (req, res) => {
  try {
    const { date, merchant, category, amount } = req.body;
    const userId = req.user._id;

    const temp = {
      date,
      merchant,
      category: {
        categoryName: category.categoryName,
        categoryColor: category.categoryColor,
      },
      amount,
      userId,
    };

    const newTransaction = new Transactions(temp);

    await newTransaction.save();

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
    res.status(204).send();
  } catch (err) {
    res
      .status(500)
      .json({ message: `Cannot delete transaction by id: ${err.message}` });
  }
};

module.exports = {
  createOne,
  getAll,
  getById,
  updateById,
  deleteById,
};
