const { Mongoose } = require("mongoose");
const Category = require("../models/category")

// GET all Categories
const getCategories = async (req, res) => {
    const categories = await Category.find({}).sort({ createdAt: -1 }); // Give all the workout docs(decending order) in to array
    // await: This keyword makes JavaScript wait until the database has finished fetching the workouts before moving on to the next line.

    res.status(200).json(categories); // sending that as json back to the brows other clients
    // .json(Brands): This converts the workouts array into a JSON format (a way to represent data) and sends it back to the client.
};

// Create a Category
const createCategory = async (req, res) => {
    const { name } = req.body;

    // add doc to db
    try {
      const category = await Category.create({ name });
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


module.exports = {
    getCategories,
    createCategory,
}