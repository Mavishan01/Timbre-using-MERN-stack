const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    nic: String,
    password: String,
    address: String,
    mobile: String,
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer
