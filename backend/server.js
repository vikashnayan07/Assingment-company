const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./route/authRoute");
const connectMongoDb = require("./config/db");

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});
connectMongoDb();
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server started at  http://localhost:${PORT}`);
});
