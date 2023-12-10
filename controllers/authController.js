const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //If the type of user is not in enum
    if (!["buyer", "seller"].includes(userType)) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType,
    });

    //save the user
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("Invalid Email");
    }

    const validatedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatedPassword) {
      return res.status(400).json("Invalid Password");
    }

    const token = jwt.sign(
      {
        id: user.email,
        userType: user.userType,
      },
      JWT_SECRET
    );

    res.status(200).json({ Token: token });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  register,
  login,
};
