const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    img_card: String,
    color_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Color' },
    ratings: { type: Number, default: 0 },
    brand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    model_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Model' },
    
    // course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
