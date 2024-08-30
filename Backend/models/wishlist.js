const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // assuming Customer is another model
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // assuming Product is another model
},{timestamps:true})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist
