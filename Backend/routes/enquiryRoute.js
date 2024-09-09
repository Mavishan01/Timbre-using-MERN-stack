const express = require("express");
const router = express.Router();
const { getEnquiries,
        createEnquiry } = require("../controllers/enquiryController");
const Enquiry = require("../models/enquiry");

router.get("/", getEnquiries);
router.post("/", createEnquiry);

module.exports = router;