const express = require("express");
const router = express.Router();

const AuthMiddleWear = require("../middlewear/AuthMiddlewear")

router.post("/", AuthMiddleWear);

module.exports = router;

