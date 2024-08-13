const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    user_name: String,
    password: String,
    email: String,
    profile_image: String,
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
