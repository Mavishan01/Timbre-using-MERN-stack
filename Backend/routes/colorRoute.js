const express = require("express");
const router = express.Router();
const { getColors,
        createColor,
        updateColor,
        deleteColor } = require("../controllers/colorController");
const Color = require("../models/color");

// Get all models
router.get("/", getColors);

// POST a new workout
router.post("/", createColor)

//update
router.put("/update/:id", updateColor)

//delete
router.delete("/delete/:id", deleteColor)

module.exports = router;