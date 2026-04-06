const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");

// register user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // simple check
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // password check (kept but moved inside)
    if (password.length < 6) {
      return res.status(400).json({ message: "Password too short" });
    }

    // hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();

    res.status(201).json({
      message: "User created",
    });

  } catch (err) {
    console.log("Register failed:", err.message); // changed from logger
    res.status(500).json({ message: "Server error" });
  }
};


// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Enter email and password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    });

  } catch (err) {
    logger.error("Login issue: " + err.message); // slightly changed style
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { registerUser, loginUser };