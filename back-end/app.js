require('dotenv').config()
const express = require('express')

const app = express()
const cors = require('cors')

const loginRouter = require('./routes/loginRouter')
const userRouter = require('./routes/userRouter')
const categoryRouter = require('./routes/wastefulCategoryRouter')
const connectDB = require('./config/db')
const dashboardRouter = require('./routes/dashboardRouter')
const forgotPasswordRouter = require('./routes/forgetPasswordRouter')
const goalRouter = require("./routes/goal.Router");
const transactionRouter = require("./routes/transactionRouter");

const refreshRouter = require("./routes/refreshRouter");

const {
  unknownEndpoint,
  errorHandler,
} = require('./middleware/customMiddleware')

const morgan = require("morgan");
const requireAuth = require("./middleware/requireAuth");

connectDB()

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json())

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Use the loginRouter for all "/tours" routes
app.use('/api/login', loginRouter)

//Use the signupRouter for all "/signups" routes
app.use("/api/signups", userRouter);

// use the refreshRouter for refreshing user credentials
app.use("/api/refresh", refreshRouter);

// auth middleware
app.use(requireAuth);

// Use the categoryRouter for all "/api/selectCategory" routes
app.use('/api/selectCategory', categoryRouter)

//dasboard
app.use('/api/dashboard', dashboardRouter)

//forgot password
app.use('/api/forgot-password', forgotPasswordRouter)

// Goal API route
app.use("/api/goals", goalRouter);

app.use("/api/transactions", transactionRouter);

// Use the refreshRouter for refresh
// app.use("/api/refresh");

// Example route that throws an error
app.get('/error', (req, res, next) => {
  // Trigger an error
  const error = new Error('Network problem')
  next(error)
})

app.use(unknownEndpoint)
app.use(errorHandler)

const port = process.env.PORT || 3000
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
app.js
