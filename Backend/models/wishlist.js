const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
},{timestamps:true})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist
