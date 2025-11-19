const express = require("express");
const app = express();
const cors = require("cors")

const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter")
const connectDB = require("./config/db");
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
require('dotenv').config();

const morgan = require("morgan");

connectDB();

app.use(morgan("dev"));
app.use(cors());

// Middleware to parse JSON
app.use(express.json());
 
// Use the loginRouter for all "/tours" routes
app.use("/api/login", loginRouter);


//Use the signupRouter for all "/signups" routes
app.use("/api/signups", signupRouter);

// Example route that throws an error
app.get('/error', (req, res, next) => {
  // Trigger an error
  const error = new Error("Network problem");
  next(error);
});

app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 