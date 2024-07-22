const express = require("express");
const { verifyUser, verifyUsers } = require("../controller/authController");
const {
  saveList,
  getLists,
  updateList,
  deleteList,
} = require("../controller/listController");
const router = express.Router();

router.post("/save", verifyUser, saveList);
router.get("/getLists", verifyUser, getLists);
router.put("/update/:id", verifyUser, updateList);
router.delete("/delete/:id", verifyUser, deleteList);

module.exports = router;
