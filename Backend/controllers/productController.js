const { Mongoose } = require("mongoose");
const Product = require("../models/product")
const Brand = require("../models/brand");
const Model = require("../models/model");
const Color = require("../models/color");
const Category = require("../models/category");

// GET all Products
// const getProducts = async (req, res) => {
//     const products = await Product.find({}).sort({ createdAt: -1 }); // Give all the workout docs(decending order) in to array
//     // await: This keyword makes JavaScript wait until the database has finished fetching the workouts before moving on to the next line.

//     res.status(200).json(products); // sending that as json back to the brows other clients
//     // .json(Brands): This converts the workouts array into a JSON format (a way to represent data) and sends it back to the client.
// };

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate("brand_id", "name") // Populating brand name
            .populate("model_id", "name") // Populating model name
            .populate("color_id", "name") // Populating color name
            .populate("category_id", "name") // Populating category name
            .sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};    


const createProduct = async (req, res) => {
    try {
        const { title, description, category_id, price, quantity, img_card, color_id, ratings, brand_id, model_id } = req.body;

        // Create a new product instance
        const newProduct = new Product({
            title,
            description,
            category_id,
            price,
            quantity,
            img_card,
            color_id,
            ratings,
            brand_id,
            model_id,
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        // Respond with the saved product
        res.status(200).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ message: 'Failed to create product', error: error.message });
    }
};
module.exports = {
    getProducts,
    createProduct
}