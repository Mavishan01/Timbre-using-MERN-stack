const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: String,
    image: String,
    
    // course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
