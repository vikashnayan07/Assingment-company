const express = require("express");
const {
  signup,
  userLoging,
  verifyUser,
} = require("../controller/authController");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(userLoging);

router
  .route("/authenticate")
  .post(verifyUser, (req, res) => res.status(200).end());

module.exports = router;
