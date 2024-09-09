const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({
    name: String,
    hex: String
})

const Color = mongoose.model('Color', colorSchema)

module.exports = Color
