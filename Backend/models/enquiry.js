const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    name: { type: String, required: [true,"Name required"] },
    email: { type: String, required: [true,"Email required"] },
    contactNo: { type: String, required: [false,"Contact number required"] },
    enquiry: { type: String },
    
},{timestamps:true});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
