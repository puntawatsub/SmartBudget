const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getUniqueCategoryNames,
} = require("../controllers/categoryControllers");
// CREATE — POST /api/categories
router.post("/", createCategory);
// GET ALL — GET /api/categories
router.get("/", getCategories);
// UPDATE — PUT /api/categories/:id
router.put("/:id", updateCategory);
// DELETE — DELETE /api/categories/:id
router.delete("/:id", deleteCategory);
// GET unique category names — GET /api/categories/unique
router.get("/unique", getUniqueCategoryNames);

module.exports = router;
