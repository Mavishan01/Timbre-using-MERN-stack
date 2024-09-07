const express = require('express')
const router = express.Router()
const { addToWishlist, getWishlistProducts, deleteProductFromCart } = require('../controllers/wishlistController')

router.post('/addToWishlist', addToWishlist)
router.get('/', getWishlistProducts)
router.delete('/deleteProduct/:id', deleteProductFromCart)

module.exports = router