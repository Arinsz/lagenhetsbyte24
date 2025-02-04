const express = require("express");
const { registerUser, verifyUser } = require("../controllers/userController");

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Verify user email
router.get("/verify/:token", verifyUser);

module.exports = router;
