const express = require("express");
const router = express.Router();
const {
    getCustomers,
    createCustomer,
    loginCustomer,
    getCustomerDetails,
    updateCustomer,
    getAddress
} = require("../controllers/customerController");

// Get all customers
router.get("/", getCustomers);
router.get("/address", getAddress)

// Get customer using an ID
router.get("/:id", getCustomerDetails);

// Update customer
router.put("/update/:id", updateCustomer);
// POST a new customer (Sign Up)
// router.post("/signup", createCustomer);

// POST to login a customer
// router.post("/login", loginCustomer);

module.exports = router;
