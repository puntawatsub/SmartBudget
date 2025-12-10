require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const requireAuth = require("./middleware/requireAuth");
const {
  unknownEndpoint,
  errorHandler,
} = require("./middleware/customMiddleware");

// Routers
const loginRouter = require("./routes/loginRouter");
const userRouter = require("./routes/userRouter");
const selectCategoryRouter = require("./routes/wastefulCategoryRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const forgotPasswordRouter = require("./routes/forgetPasswordRouter");
const goalRouter = require("./routes/goals");
const transactionRouter = require("./routes/transactionRouter");
const settingRouter = require("./routes/settingRouter");
const categoryRouter = require("./routes/categoryRouter");
const aiSpendingAnalysisRouter = require("./routes/aiSpendingAnalysisRouter");
const refreshRouter = require("./routes/refreshRouter");
const upcomingBillsRouter = require("./routes/upcomingBillsRouter");

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(morgan("dev"));
console.log(`Cors: ${process.env.WEB_URL}`);
app.use(
  cors({
    origin: process.env.WEB_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("view"));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/login", loginRouter);
app.use("/api/signups", userRouter);
app.use("/api/refresh", refreshRouter);
app.use("/api/forgot-password", forgotPasswordRouter);

// Only apply requireAuth to these API routes
app.use("/api/selectCategory", requireAuth, selectCategoryRouter);
app.use("/api/dashboard", requireAuth, dashboardRouter);
app.use("/api/goals", requireAuth, goalRouter);
app.use("/api/transactions", requireAuth, transactionRouter);
app.use("/api/categories", requireAuth, categoryRouter);
app.use("/api/upcoming-bills", requireAuth, upcomingBillsRouter);
app.use("/api/llm", requireAuth, aiSpendingAnalysisRouter);
app.use("/api/settings", requireAuth, settingRouter);

// Example route that throws an error
app.get("/error", (req, res, next) => {
  const error = new Error("Network problem");
  next(error);
});

// Unknown API endpoints
app.use("/api", unknownEndpoint);

// Global error handler
app.use(errorHandler);

// Catch-all route for frontend
app.use((req, res) => {
  res.sendFile(__dirname + "/view/index.html");
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = server;
