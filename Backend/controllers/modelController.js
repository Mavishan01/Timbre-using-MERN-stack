const { Mongoose } = require("mongoose");
const Model = require("../models/model")

// GET all Models
const getModels = async (req, res) => {
    const models = await Model.find({}).sort({ createdAt: -1 }); // Give all the workout docs(decending order) in to array
    // await: This keyword makes JavaScript wait until the database has finished fetching the workouts before moving on to the next line.

    res.status(200).json(models); // sending that as json back to the brows other clients
    // .json(Brands): This converts the workouts array into a JSON format (a way to represent data) and sends it back to the client.
};

// Create a Model
// const createBrand = async (req, res) => {
//     const { name } = req.body;

//     // add doc to db
//     try {
//       const brand = await Brand.create({ name });
//       res.status(200).json(brand);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };


module.exports = {
    getModels,
    // createBrand
}