const Category = require("../models/categoryModel");

// CREATE — POST /api/categories
const createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      ...req.body,
      userId: req.user._id,
    });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// GET ALL — GET /api/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user._id });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// UPDATE — PUT /api/categories/:id
const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { ...req.body },
      {
        new: true,
      }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// DELETE — DELETE /api/categories/:id
const deleteCategory = async (req, res) => {
  try {
    await Category.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get unique category names for a user
const getUniqueCategoryNames = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user._id }).distinct(
      "name"
    );
    console.log(categories);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getUniqueCategoryNames,
};
