const express = require("express");
const router = express.Router();

const transaction = require("../controllers/transactionController");

router.get("/", transaction.getAll);
router.post("/", transaction.createOne);
router.get("/:id", transaction.getById);
router.put("/:id", transaction.updateById);
router.delete("/:id", transaction.deleteById);

module.exports = router;
