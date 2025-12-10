const mongoose = require("mongoose");

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      // console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      throw new Error(`MongoDB connection error: ${error.message}`);
    }
  }
};

module.exports = connectDB;
