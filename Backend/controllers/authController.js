const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const Admin = require("../models/admin");

// Customer login
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const customer = await Customer.findOne({ email });

//         if (!customer) return res.status(400).json({ message: "Invalid credentials hhj" });
//         console.log(customer)

//         const isMatch = await bcrypt.compare(password, customer.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//         const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//         res.cookie("token", token, {
//             httpOnly: false,
//             withCredentials: true
//         })

//         res.json({ customer, message: "Customer Login Success", status: true });
//     } catch (err) {
//         res.status(500).json({ message: "Server error", statu: false });
//     }
// };

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

        res.cookie("token", token, {
            httpOnly: false,
            withCredentials: true,
            type: "Customer"
        });
        

    
        res.json({ customer, message: "Customer Login Success", status: true });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Server error" });
    }
};




// Customer signup
// const signupUser = async (req, res) => {
//     const { fname, lname, mobile, email, address, password } = req.body;

//     try {
//         const existingUser = await Customer.findOne({ email });
//         console.log(existingUser)
//         if (existingUser) return res.status(400).json({ message: "User already exists" });

//         const hashedPassword = await bcrypt.hash(password, 12);
//         const newCustomer = new Customer({ first_name: fname, last_name: lname, mobile: mobile, address: address, email, password: hashedPassword });

//         await newCustomer.save();
//         const token = jwt.sign({ id: newCustomer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//         res.cookie("token", token, {
//             httpOnly: false,
//             withCredentials: true
//         })

//         res.status(201).json({ customer: newCustomer, message: "Customer Signup Success", status: true });
//     } catch (err) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

const signupUser = async (req, res) => {
    const { fname, lname, mobile, email, address, password } = req.body;

    try {
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
        res.status(201).json({ customer: newCustomer, message: "Customer Signup Success", status: true });
    } catch (err) {
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
        res.cookie("token", token, {
            httpOnly: false,
            withCredentials: true,
            type: "Admin"
        })
        res.json({ admin, message: "Admin Login Success", status: true });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    loginUser,
    signupUser,
    loginAdmin,
};