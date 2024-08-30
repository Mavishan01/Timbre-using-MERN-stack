const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const customerSchema = new mongoose.Schema({
    first_name: { type: String, required: [true,"First name required"] },
    last_name: { type: String, required: [true,"Last name required"] },
    email: { type: String, required: [true,"Email required"], unique: true },
    password: { type: String, required: [true,"Password required"] },
    address: { type: String },
    mobile: { type: String }
},{timestamps:true});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

