const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, 
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
    quantity: Number,
    status:Boolean
},{timestamps:true})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
