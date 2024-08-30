const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    status: { type: Number},
},{timestamps:true})

const Status = mongoose.model('Status', statusSchema)

module.exports = Status
