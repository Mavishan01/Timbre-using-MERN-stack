const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // assuming Customer is another model
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // assuming Product is another model
    date: Date,
    item_count: Number,
    delivery_status: Number,
    review: String,
    price_per_item: Number,
    delivery_fee: Number,
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order