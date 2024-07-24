const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require("./route/authRoute");
const listRoute = require("./route/listRoute");
const proxyRoute = require("./route/proxyRoute");
const connectMongoDb = require("./config/db");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/lists", listRoute);
app.use("/api", proxyRoute);

const PORT = process.env.PORT || 5000;

connectMongoDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
