const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // assuming Category is another model
    price: Number,
    quantity: Number,
    img_card: String,
    color: String,
    ratings: Number,
    brand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }, // assuming Brand is another model
    model_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Model' }, // assuming Model is another model
    
    // course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
