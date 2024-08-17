const express = require("express");
const router = express.Router();
const { 
    getCustomers, 
    createCustomer, 
    loginCustomer 
} = require("../controllers/customerController");

// Get all customers
router.get("/", getCustomers);

// POST a new customer (Sign Up)
// router.post("/signup", createCustomer);

// POST to login a customer
// router.post("/login", loginCustomer);

module.exports = router;
