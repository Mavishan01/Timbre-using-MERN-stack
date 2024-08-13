const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    name: String,
    
    // course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
})

const Brand = mongoose.model('Brand', brandSchema)

module.exports = Brand
