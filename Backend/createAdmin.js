require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/admin'); // Adjust path as needed

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        const existingAdmin = await Admin.findOne();
        if (existingAdmin) {
            console.log('Admin already exists.');
            return;
        }

        // Hash the secure password
        const hashedPassword = await bcrypt.hash('admin123', 12); // Simple password
        // Updated secure password
        const admin = new Admin({
            email: 'admin@example.com',
            password: hashedPassword,
        });

        await admin.save();
        console.log('Admin created successfully.');
    } catch (err) {
        console.error('Error creating admin:', err);
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();
