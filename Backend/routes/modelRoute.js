const express = require("express");
const router = express.Router();
const { getModels,
        createModel,
        updateModel,
        deleteModel } = require("../controllers/modelController");
const Model = require("../models/model");

// Get all models
router.get("/", getModels);

// POST a new workout
router.post("/", createModel)

//update
router.put("/update/:id", updateModel)

//delete
router.delete("/delete/:id", deleteModel)

module.exports = router;