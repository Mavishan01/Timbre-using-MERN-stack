const express = require("express");
const payHere = require("../controllers/paymentController");

const router = express.Router()

router.post("/v1",payHere);

module.exports = router