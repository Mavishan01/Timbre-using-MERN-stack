require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express(); // Express app

// Importing models
const Product = require("./models/product");
const Category = require("./models/category");
const Brand = require("./models/brand");
const Model = require("./models/model");
const Customer = require("./models/customer");
const Admin = require("./models/admin");
const Cart = require("./models/cart");
const Wishlist = require("./models/wishlist");
const Order = require("./models/order");
const Color = require("./models/color")
// const Auth = require("./models/user")

// Importing routes
const brandRoutes = require("./routes/brandRoute");
const categoryRoutes = require("./routes/categoryRoute");
const modelRoutes = require("./routes/modelRoute");
const customerRoutes = require("./routes/customerRoute");
const authRoutes = require("./routes/authRoute"); // Add auth routes
const middlewareRoutes = require("./routes/middlewearRoute");
const colorRoutes = require("./routes/colorRoute");
const productRoutes = require("./routes/productRoute");

// Middleware
app.use(express.json()); // Converts incoming request bodies to JSON

// Logging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/models", modelRoutes)
app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes); // Add the auth routes for handling login, signup, and admin login
app.use("/api", middlewareRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/products", productRoutes);

// Connect to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to db & listening on port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log("Database connection error:", error);
    });
