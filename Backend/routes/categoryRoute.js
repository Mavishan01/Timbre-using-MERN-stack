const express = require("express");
const router = express.Router();
const { getCategories,
        createCategory,
        updateCategory,
        deleteCategory } = require("../controllers/categoryController");

// Get all models
router.get("/", getCategories);

// POST a new workout
router.post("/", createCategory)

//Update
router.put("/update/:id", updateCategory)

//delete
router.delete("/delete/:id", deleteCategory)

module.exports = router;