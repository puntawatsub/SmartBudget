const mongoose = require('mongoose')

const connectDB = async () => {
<<<<<<< HEAD
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    // process.exit(1);
=======
  if (mongoose.connection.readyState === 0) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      // console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      throw new Error(`MongoDB connection error: ${error.message}`)
    }
>>>>>>> origin/main
  }
}

module.exports = connectDB
