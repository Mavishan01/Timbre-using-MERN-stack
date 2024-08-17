const express = require("express");
const { loginUser, signupUser, loginAdmin } = require("../controllers/authController");

const router = express.Router();

// Route for customer login
router.post("/login", loginUser);

// Route for customer signup
router.post("/signup", signupUser);

// Route for admin login
router.post("/admin-login", loginAdmin);

module.exports = router;
