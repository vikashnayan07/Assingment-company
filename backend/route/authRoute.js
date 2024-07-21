const express = require("express");
const { signup, userLoging } = require("../controller/authController");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(userLoging);
module.exports = router;
