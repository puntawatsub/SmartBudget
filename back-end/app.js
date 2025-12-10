require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");

// All API routes are mounted via `routes/apiRouter.js`
const apiRouter = require("./routes/apiRouter");

const cookieParser = require("cookie-parser");

const {
  unknownEndpoint,
  errorHandler,
} = require("./middleware/customMiddleware");
const morgan = require("morgan");
// auth now handled inside `routes/apiRouter.js`
const connectDB = require("./config/db");

connectDB();

// app.get("/", (req, res) => {
//   res.send("API is running");
// });

app.use(morgan("dev"));
app.use(
  cors({
    origin: `${process.env.WEB_URL}`,
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Mount our consolidated API router (handles public and protected API routes)
app.use("/api", apiRouter);
app.use(express.static("view"));

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
