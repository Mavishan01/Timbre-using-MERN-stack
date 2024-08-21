const mongoose = require("mongoose");
const Customer = require("../models/customer");

// Get all Customers
const getCustomers = async (req, res) => {
  const customers = await Customer.find({}).sort({ createdAt: -1 });
  res.status(200).json(customers);
};

// Get one customer
const getCustomerDetails = async (req, res) => {
  const { id } = req.params;
  try{
    const customer = await Customer.findById(id);
    if(!customer)
    {
      return res.status(400).json({ error: "Customer not found" });
    }
    else
    {
      res.json(customer);
    }
  }
  catch(err)
  {
    res.status(400).json({ error: err.message });
  }
}

// Create a Customer (Sign Up)
const createCustomer = async (req, res) => {
  const { first_name, last_name, email, password, address, mobile } = req.body;

  try {
    // Check if a customer with the same email already exists
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      return res.status(400).json({ error: "Customer already exists. Please log in." });
    }

    // Add new customer to the database
    const customer = await Customer.create({ first_name, last_name, email, password, address, mobile });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login a Customer
const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if a customer with the provided email exists
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(400).json({ error: "No account found with this email. Please sign up." });
    }

    // Check if the provided password matches the customer's password
    if (customer.password !== password) {
      return res.status(400).json({ error: "Incorrect password. Please try again." });
    }

    res.status(200).json({ message: "Login successful", customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCustomers,
  createCustomer,
  loginCustomer,
  getCustomerDetails,
};
