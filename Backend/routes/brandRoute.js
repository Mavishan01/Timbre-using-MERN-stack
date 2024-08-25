const express = require("express");
const router = express.Router();
const { getBrands,
        createBrand } = require("../controllers/brandController");
const Brand = require("../models/brand");

// Get all brands
router.get("/", getBrands);

// POST a new workout
router.post("/", createBrand)

module.exports = router;