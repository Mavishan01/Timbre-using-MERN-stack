const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const customerSchema = new mongoose.Schema({
    first_name: { type: String, required: [true,"First name required"] },
    last_name: { type: String, required: [true,"First name required"] },
    email: { type: String, required: [true,"First name required"], unique: true },
    password: { type: String, required: [true,"First name required"] },
    address: { type: String },
    mobile: { type: String }
});

// Hash password before saving
customerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Compare hashed password
customerSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Generate JWT token
customerSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
