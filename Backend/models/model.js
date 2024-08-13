const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    name: String,
    
    // course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
})

const Model = mongoose.model('Model', modelSchema)

module.exports = Model
