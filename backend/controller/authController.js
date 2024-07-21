const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJWTToken = (user) => {
  const token = jwt.sign(
    {
      data: {
        userId: user._id,
        email: user.email,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return token;
};

const verifyUser = async (req, res, next) => {
  try {
    const { email } = req.method === "GET" ? req.query : req.body;
    const exist = await User.findOne({ email });
    if (!exist) return res.status(404).send({ msg: "User not found" });
    next();
  } catch (error) {
    return res.status(500).send({ msg: "Authentication error" });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        status: "Failed",
        msg: "Email already in use",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashpassword,
    });

    await newUser.save();

    return res.status(201).json({
      status: "Success",
      msg: "New User created Successfully",
      data: { user: newUser },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      status: "Failed",
      msg: "Internal server error",
      error,
    });
  }
};

const userLoging = async (req, res) => {
  try {
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
      return res
        .status(401)
        .json({ status: "Failed", msg: "Unauthorized User" });
    } else {
      const token = generateJWTToken(user);
      return res.status(200).json({
        status: "Success",
        msg: "Logged in Successfully",
        data: {
          user: {
            name: user.name,
            email: user.email,
          },
          token,
        },
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: "Failed",
      msg: "Internal server error",
    });
  }
};

module.exports = { signup, userLoging, verifyUser };
