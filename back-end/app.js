require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");

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

const cookieParser = require("cookie-parser");

const refreshRouter = require("./routes/refreshRouter");
const upcomingBillsRouter = require("./routes/upcomingBillsRouter");

const {
  unknownEndpoint,
  errorHandler,
} = require("./middleware/customMiddleware");

const morgan = require("morgan");
const requireAuth = require("./middleware/requireAuth");
const connectDB = require("./config/db");

connectDB();

// app.get("/", (req, res) => {
//   res.send("API is running");
// });

app.use(morgan("dev"));
console.log(`Cors: ${process.env.WEB_URL}`);
app.use(
  cors({
    origin: `${process.env.WEB_URL}`,
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());
app.use(express.static("view"));

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Use the loginRouter for all "/tours" routes
app.use("/api/login", loginRouter);

//Use the signupRouter for all "/signups" routes
app.use("/api/signups", userRouter);

// use the refreshRouter for refreshing user credentials
app.use("/api/refresh", refreshRouter);

//forgot password
app.use("/api/forgot-password", forgotPasswordRouter);

// auth middleware
app.use(requireAuth);

// Use the categoryRouter for all "/api/selectCategory" routes
app.use("/api/selectCategory", selectCategoryRouter);

//dasboard
app.use("/api/dashboard", dashboardRouter);

// Goal API route
app.use("/api/goals", goalRouter);

app.use("/api/transactions", transactionRouter);

// Category API route
app.use("/api/categories", categoryRouter);

//upcoming bill API route
app.use("/api/upcoming-bills", upcomingBillsRouter);

// Use the refreshRouter for refresh
// app.use("/api/refresh");

app.use("/api/llm", aiSpendingAnalysisRouter);

// Use the settingRouter for all routes that begin with "/api/settings"
app.use("/api/settings", settingRouter);

// Example route that throws an error
app.get("/error", (req, res, next) => {
  // Trigger an error
  const error = new Error("Network problem");
  next(error);
});

app.use("/api", unknownEndpoint);
app.use(errorHandler);

app.use((req, res) => {
  res.sendFile(__dirname + "/view/index.html");
});

const port = process.env.PORT || 3000;
// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = server;
