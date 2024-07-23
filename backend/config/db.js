const mongoose = require("mongoose");

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(".......Database Connected......");
  } catch (error) {
    console.log("Could not connect database", error);
    process.exit(1);
  }
};

module.exports = connectMongoDb;
