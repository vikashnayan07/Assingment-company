const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJWTToken = (user) => {
  const token = jwt.sign(
    {
      expiry: "24h",
      data: {
        userId: user._id,
        email: user.email,
      },
    },
    process.env.JWT_SECRET
  );

  return token;
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(404).json({
        status: "Failed",
        msg: "User not found",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const newUSer = new User({
      name,
      email,
      password: hashpassword,
    });

    await newUSer.save();

    return res.status(201).json({
      status: "Success",
      msg: "New User created Successfully",
      data: { user: newUSer },
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      msg: "Internal server error",
    });
  }
};

const userLoging = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Invalid User",
      status: "failed",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      status: "Failed",
      msg: "User not Found",
    });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(401).json({ status: "Failed", msg: "Unauthorized User" });
  } else {
    return res.status(200).json({
      status: "Success",
      msg: "Loging Successfully..",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
        token: generateJWTToken(user),
      },
    });
  }
};

module.exports = { signup, userLoging };
