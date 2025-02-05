const express = require("express");
const { loginUser, logoutUser } = require("../controllers/userController");

const router = express.Router();

// Add login route
router.post("/login", loginUser);

// Add logout route
router.post("/logout", logoutUser);

module.exports = router;
