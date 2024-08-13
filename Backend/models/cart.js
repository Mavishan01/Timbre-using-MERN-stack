const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // assuming Customer is another model
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // assuming Product is another model
    Quantity: Number,
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
