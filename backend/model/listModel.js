const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  responseCodes: { type: [String], required: true },
  imageLinks: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

const List = mongoose.model("List", listSchema);
module.exports = List;
