const mongoose = require("mongoose");

const connectMongoDb = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URI)
      .then(() => {
        console.log(".......Database Connected......");
      })
      .catch((error) => {
        return console.log("Could not connect database");
      });
  } catch (error) {
    return console.log("Could not connect database", error);
  }
};
module.exports = connectMongoDb;
