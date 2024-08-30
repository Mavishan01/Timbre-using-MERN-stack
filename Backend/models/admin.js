const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    user_name: String,
    password: String,
    email: String,
    profile_image: String,
},{timestamps:true})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
