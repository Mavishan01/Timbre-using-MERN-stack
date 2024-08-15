const express = require("express");
const router = express.Router();
const { getCategories,
        createCategory } = require("../controllers/categoryController");

// Get all models
router.get("/", getCategories);

// POST a new workout
router.post("/", createCategory)

module.exports = router;