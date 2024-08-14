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

// Importing routes
const brandRoutes = require("./routes/brandRoute");
const categoryRoutes = require("./routes/categoryRoute")

// Middleware
// This middleware converts incoming request bodies to JSON
app.use(express.json());

// Routes
app.use("/api/brands", brandRoutes); // Use brandRoutes for the routes
app.use("/api/categories", categoryRoutes)

// Logging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Connect to database
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to db & listening to port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });

