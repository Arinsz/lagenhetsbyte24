const User = require("../models/User");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: "Email already exists" });
    } else {
      console.error("Error registering user:", error); // Log the error
      res
        .status(500)
        .json({ message: "Registration failed", error: error.message });
    }
  }
};

module.exports = { registerUser };
