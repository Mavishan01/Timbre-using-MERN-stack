const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    name: String,
},{timestamps:true})

const Model = mongoose.model('Model', modelSchema)

module.exports = Model
