const { Mongoose } = require("mongoose");
const Color = require("../models/color")

// GET all Categories
const getColors = async (req, res) => {
    const colors = await Color.find({}).sort({ createdAt: -1 }); // Give all the workout docs(decending order) in to array
    // await: This keyword makes JavaScript wait until the database has finished fetching the workouts before moving on to the next line.

    res.status(200).json(colors); // sending that as json back to the brows other clients
    // .json(Brands): This converts the workouts array into a JSON format (a way to represent data) and sends it back to the client.
};


module.exports = {
    getColors,
}