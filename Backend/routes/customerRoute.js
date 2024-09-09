const express = require("express");
const router = express.Router();
const {
    getCustomers,
    getCustomerDetails,
    updateCustomer,
    getAddress,
    getCustomerCount
} = require("../controllers/customerController");

router.get("/", getCustomers);
router.get("/address", getAddress);

router.get("/:id", getCustomerDetails);

router.put("/update/:id", updateCustomer);

router.get('/get/customerCount', getCustomerCount); 

module.exports = router;
