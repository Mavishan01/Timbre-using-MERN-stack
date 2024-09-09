const { Mongoose } = require("mongoose");
const Enquiry = require("../models/enquiry")

// GET all Brands
const getEnquiries = async (req, res) => {
    console.log("received")
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 }); // Give all the workout docs(decending order) in to array
    // await: This keyword makes JavaScript wait until the database has finished fetching the workouts before moving on to the next line.

    res.status(200).json(enquiries); // sending that as json back to the brows other clients
    // .json(Brands): This converts the workouts array into a JSON format (a way to represent data) and sends it back to the client.
};

// Create a Model
const createEnquiry = async (req, res) => {
  console.log("received")
    const { name, email, contactNo, enquiry } = req.body;
    console.log(req.body)
    console.log(name, email, contactNo, enquiry);

    // add doc to db
    try {
      console.log("database");    
      const enquiry_1 = await Enquiry.create({name, email, contactNo, enquiry });
      console.log(enquiry_1)
      res.status(200).json(enquiry_1);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {
    getEnquiries,
    createEnquiry
}