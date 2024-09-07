const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const Admin = require("../models/admin");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email });

        if (!customer) return res.status(400).json({ message: "Invalid credentials" });

        console.log("Stored hashed password:", customer.password);
        console.log("Password provided by user:", password);

        const isMatch = await bcrypt.compare(password, customer.password);

        console.log("Password match result:", isMatch);

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

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new customer
        const newCustomer = new Customer({
            first_name: fname,
            last_name: lname,
            mobile: mobile,
            address: address,
            email: email,
            password: hashedPassword
        });

        // Save the new customer to the database
        await newCustomer.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newCustomer._id, email: newCustomer.email, type: 'Customer' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('user_id', newCustomer._id, { httpOnly: true, maxAge: 60 * 60 * 1000 });

        // Return the customer data and token
        res.status(201).json({ customer: newCustomer, token, message: "Customer Signup Success", status: true });
    } catch (err) {
        console.error("Signup error:", err); // Log any error that occurs
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