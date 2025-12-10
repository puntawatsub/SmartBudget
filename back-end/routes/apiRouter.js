const express = require("express");
const router = express.Router();

// Public routes (no auth)
const loginRouter = require("./loginRouter");
const userRouter = require("./userRouter");
const refreshRouter = require("./refreshRouter");
const forgotPasswordRouter = require("./forgetPasswordRouter");

// Protected routes (require auth)
const requireAuth = require("../middleware/requireAuth");
const selectCategoryRouter = require("./wastefulCategoryRouter");
const dashboardRouter = require("./dashboardRouter");
const goalRouter = require("./goals");
const transactionRouter = require("./transactionRouter");
const settingRouter = require("./settingRouter");
const categoryRouter = require("./categoryRouter");
const aiSpendingAnalysisRouter = require("./aiSpendingAnalysisRouter");
const upcomingBillsRouter = require("./upcomingBillsRouter");

// Mount public endpoints first
router.use("/login", loginRouter);
router.use("/signups", userRouter);
router.use("/refresh", refreshRouter);
router.use("/forgot-password", forgotPasswordRouter);

// Apply auth for all routes below
router.use(requireAuth);

router.use("/selectCategory", selectCategoryRouter);
router.use("/dashboard", dashboardRouter);
router.use("/goals", goalRouter);
router.use("/transactions", transactionRouter);
router.use("/categories", categoryRouter);
router.use("/upcoming-bills", upcomingBillsRouter);
router.use("/llm", aiSpendingAnalysisRouter);
router.use("/settings", settingRouter);

module.exports = router;
