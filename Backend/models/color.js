const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({
    name: String,
    hex: String
    
    // course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
})

const Color = mongoose.model('Color', colorSchema)

module.exports = Color
