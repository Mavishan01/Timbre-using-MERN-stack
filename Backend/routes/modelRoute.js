const express = require("express")
const router = express.Router()
const {getModels} = require("../controllers/modelController")

// Get all models
router.get("/", getModels);


module.exports = router;