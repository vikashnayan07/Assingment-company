const express = require("express");
const {
  signup,
  userLoging,
  verifyUser,
  verifyUsers,
} = require("../controller/authController");
const User = require("../model/userModel");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(userLoging);

router.route("/authenticate").post(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User found" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
