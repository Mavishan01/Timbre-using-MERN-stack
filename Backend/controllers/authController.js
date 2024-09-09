const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const Admin = require("../models/admin");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email });         // Find the customer

        if (!customer) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) return res.status(400).json({ message: "Invalid password credentials" });

        const token = jwt.sign({ id: customer._id, type: "Customer" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie('user_id', customer._id, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        res.json({ customer, token , message: "Customer Login Success", status: true });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Server error" });
    }
};

const signupUser = async (req, res) => {
    const { fname, lname, mobile, email, address, password } = req.body;

    console.log("Received data:", { fname, lname, mobile, email, address, password });
    try {
        // Check if the user already exists
        const existingUser = await Customer.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newCustomer = new Customer({
            first_name: fname,
            last_name: lname,
            mobile: mobile,
            address: address,
            email: email,
            password: hashedPassword
        });

        await newCustomer.save();

        const token = jwt.sign({ id: newCustomer._id, email: newCustomer.email, type: 'Customer' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('user_id', newCustomer._id, { httpOnly: true, maxAge: 60 * 60 * 1000 });

        res.status(201).json({ customer: newCustomer, token, message: "Customer Signup Success", status: true });
    } catch (err) {
        console.error("Signup error:", err); 
        res.status(500).json({ message: "Server error" });
    }
};

// Admin login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Invalid credentials " });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id, type: "Admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        res.json({ admin, token, message: "Admin Login Success", status: true });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    loginUser,
    signupUser,
    loginAdmin,
};