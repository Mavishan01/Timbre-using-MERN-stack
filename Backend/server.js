require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors');


const app = express(); // Express app

// Importing models
const Product = require("./models/product");
const Category = require("./models/category");
const Brand = require("./models/brand");
const Model = require("./models/model");
const Enquiry = require("./models/enquiry");
const Customer = require("./models/customer");
const Admin = require("./models/admin");
const Cart = require("./models/cart");
const Wishlist = require("./models/wishlist");
const Color = require("./models/color");
const DS = require("./models/delivery_status");
// const Auth = require("./models/user")

// Importing routes
const brandRoutes = require("./routes/brandRoute");
const categoryRoutes = require("./routes/categoryRoute");
const modelRoutes = require("./routes/modelRoute");
const customerRoutes = require("./routes/customerRoute");
const enquiryRoutes = require("./routes/enquiryRoute");
const authRoutes = require("./routes/authRoute"); // Add auth routes
const middlewareRoutes = require("./routes/middlewearRoute");
const colorRoutes = require("./routes/colorRoute");
const productRoutes = require("./routes/productRoute");
const cartRoutes = require('./routes/cartRoute')
const wishlistRoutes = require('./routes/wishlistRoutes')
const payHereRoute = require('./routes/paymentsRoute')
const invoiceRoutes = require('./routes/invoiceRoute')
const invoiceItemRoute = require('./routes/invoiceItemRoute')

// Middleware
app.use(express.json()); // Converts incoming request bodies to JSON
app.use(cors());
// Logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(
  "/categories",
  (req, res, next) => {
    res.setHeader("Cache-Control", "no-cache");
    next();
  },
  express.static(path.join(__dirname, "/src/uploads/categories"))
);
app.use(
  "/products",
  (req, res, next) => {
    res.setHeader("Cache-Control", "no-cache");
    next();
  },
  express.static(path.join(__dirname, "/src/uploads/products"))
);

// Routes
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/models", modelRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/auth", authRoutes); // Add the auth routes for handling login, signup, and admin login
app.use("/api", middlewareRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/products", productRoutes);
app.use('/api/cart', cartRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/payments', payHereRoute);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/invoice-items', invoiceItemRoute);

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
