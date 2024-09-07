const mongoose = require('mongoose')

const DeliveryStatusSchema = new mongoose.Schema({
    status: { type: String, required: true }
}, { timestamps: true })

const DeliveryStatus = mongoose.model('DeliveryStatus', DeliveryStatusSchema)

module.exports = DeliveryStatus
