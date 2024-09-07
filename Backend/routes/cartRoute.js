const express = require('express')
const router = express.Router()
const { addToCart, getCartProducts, deleteProductFromCart, updateCartQtyStatus, updateQuantity } = require('../controllers/cartController')

router.post('/addToCart', addToCart)
router.get('/', getCartProducts)
router.delete('/deleteProduct/:id', deleteProductFromCart)
router.put('/updateProduct', updateCartQtyStatus)
router.put('/updateQty', updateQuantity)

module.exports = router