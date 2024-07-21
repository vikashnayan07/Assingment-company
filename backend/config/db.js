const mongoose = require("mongoose");

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(".......Database Connected......");
  } catch (error) {
    console.log("Could not connect database", error);
    process.exit(1); // Exit the process with failure code
  }
};

module.exports = connectMongoDb;
