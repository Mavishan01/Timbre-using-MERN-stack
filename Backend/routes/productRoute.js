const express = require("express")
const router = express.Router()
const {getProducts, createProduct, updateProduct, deleteProduct} = require("../controllers/productController")

// Get all products
router.get("/", getProducts);

// create Product
router.post("/", createProduct);

// Update Product
router.put("/update/:id", updateProduct);

// Delete Product 
router.delete("/delete/:id", deleteProduct);

module.exports = router;