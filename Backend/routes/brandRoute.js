const express = require("express");
const router = express.Router();
const { getBrands,
        createBrand,
        updateBrand,
        deleteBrand } = require("../controllers/brandController");
const Brand = require("../models/brand");

// Get all models
router.get("/", getBrands);

// POST a new workout
router.post("/", createBrand)

//update
router.put("/update/:id", updateBrand)

//delete
router.delete("/delete/:id", deleteBrand)

module.exports = router;