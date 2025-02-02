const express = require("express");
const { loginUser } = require("../controllers/userController");

const router = express.Router();

// Add login route
router.post("/login", loginUser);

module.exports = router;
