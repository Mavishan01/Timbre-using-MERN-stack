const express = require("express")
const router = express.Router()
const {getProducts, createProduct} = require("../controllers/productController")

// Get all products
router.get("/", getProducts);

// create Product
router.post("/", createProduct);
module.exports = router;