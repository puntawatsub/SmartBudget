const express = require("express");
const router = express.Router();

const generateText = require("../controllers/wastefulCategoryControllers");

router.post("/", generateText);

module.exports = router;
