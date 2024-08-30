const express = require('express')
const router = express.Router()
const { addToCart, getCartProducts,deleteProductFromCart } = require('../controllers/cartController')

router.post('/addToCart', addToCart)
router.get('/', getCartProducts)
router.delete('/deleteProduct/:id', deleteProductFromCart)

module.exports = router