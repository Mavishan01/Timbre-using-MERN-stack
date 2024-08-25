const express = require("express")
const router = express.Router()
const {getColors} = require("../controllers/colorController")

// Get all models
router.get("/", getColors);


module.exports = router;