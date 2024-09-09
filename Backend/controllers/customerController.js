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
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(400).json({ error: "Customer not found" });
    }
    else {
      res.status(200).json({customer: customer});
    }
  }
  catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateCustomer = async (req, res) => {
  const customerID = req.params.id;
  const updateData = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerID,
      updateData,
      { new: true }
    );

    if (!updateCustomer) {
      console.log("Customer cannot found")
      return res.status(400).json({ message: 'Customer cannot found' })
    }
    console.log("Customer updated successfully")

    res.status(200).json({
      message: 'Customer updated successfully',
      customer: updatedCustomer
    });

  }
  catch (error) {
    console.error('Error updating customer:', error);
    res.status(400).json({ message: 'Server error', error });
  }

}

const getAddress = async (req, res) => {
  const { id } = req.query
  try {
    const customer = await Customer.findById(id)
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.status(200).json({ message: 'Success', customer: customer })
  } catch (error) {
    console.error('Error getting address:', error);
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getCustomerCount = async (req, res) => {
  try {
    const customerCount = await Customer.countDocuments(); 
    console.log('Customer count:', customerCount); 
    res.status(200).json({ count: customerCount });
  } catch (error) {
    console.error('Error getting customer count:', error); 
    res.status(500).json({ error: 'Error getting customer count' });
  }
};

module.exports = {
  getCustomers,
  getCustomerDetails,
  updateCustomer,
  getAddress,
  getCustomerCount, 
};

