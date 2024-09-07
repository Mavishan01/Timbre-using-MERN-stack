const express = require("express")
const router = express.Router()
const { getProducts, createProduct, updateProduct, deleteProduct, getNewArrivals, mostRatedProducts, getProductsByCategory, getProductsByBrands } = require("../controllers/productController");
const createUploadMiddleware = require("../middlewear/uploadMiddleware");


const uploadProductImage = createUploadMiddleware("products", "image");
// Get all products
router.get("/", getProducts);

// create Product
router.post("/", uploadProductImage, createProduct);

// Update Product
router.put("/update/:id",uploadProductImage, updateProduct);

// Delete Product 
router.delete("/delete/:id", deleteProduct);

router.get("/new-arrivals", getNewArrivals)
router.get("/most-rated", mostRatedProducts)
router.get("/by-category/:id", getProductsByCategory)
router.post('/by-brands/', getProductsByBrands)

module.exports = router;