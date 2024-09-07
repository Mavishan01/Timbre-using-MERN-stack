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
        const { title, description, category_id, price, quantity, color_id, ratings, brand_id, model_id } = req.body;
        console.log(req.file)
        const image = req.file.filename;
        // Create a new product instance
        const newProduct = new Product({
            title,
            description,
            category_id,
            price,
            quantity,
            img_card: image,
            color_id,
            ratings,
            brand_id,
            model_id,
        });

        console.log(newProduct)
        // Save the product to the database
        const savedProduct = await newProduct.save();

        // Respond with the saved product
        res.status(200).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ message: 'Failed to create product', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const productID = req.params.id;
    const { title, description, category_id, price, quantity, color_id, brand_id, model_id } = req.body;

    let updateData = {
        title,
        description,
        category_id,
        price,
        quantity,
        color_id,
        brand_id,
        model_id,
    };

    if (req.file) {
        const image = req.file.filename;
        updateData.img_card = image;
    }

    try {
        await Product.findByIdAndUpdate(
            productID,
            updateData,
            { new: true }
        );

        const updatedProduct = await Product.findById(productID)
            .populate("brand_id", "name")
            .populate("model_id", "name")
            .populate("color_id", "name")
            .populate("category_id", "name");

        if (!updatedProduct) {
            console.log("Product not found");
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log("Product updated successfully");

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct,
        });


    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(400).json({ message: 'Server error', error });
    }
};

const getNewArrivals = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('brand_id', 'name')
            .sort({ createdAt: -1 })
            .limit(6);
        if (!products) {
            res.status(400).json({ message: 'Products not found', error });
        }
        res.status(200).json({ message: "Success", products: products })
    } catch (error) {
        console.error('Error deleting new arrivals:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}

const mostRatedProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ ratings: -1 }).limit(6);
        if (!products) {
            res.status(400).json({ message: 'Products not found', error });
        }
        return res.status(200).json({ message: "Success", products: products })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

const getProductsByCategory = async (req, res) => {
    const id = req.params.id
    try {
        const category = Category.findById(id)
        if (!category) {
            return res.status(400).json({ message: 'Category not found' })
        }
        const products = await Product.find({ category_id: id })
        if (!products) {
            return res.status(400).json({ message: 'Products not found' })
        }
        return res.status(200).json({ message: "Success", products: products })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error' })
    }
}

const getProductsByBrands = async (req, res) => {
    const { brands } = req.body
    try {
        if (!brands || brands.length === 0) {
            return res.status(400).json({ message: 'Please select at least one brand' })
        }
        const products = await Product.find({ brand_id: { $in: brands } })
        if (products.length === 0) {
            return res.status(400).json({ message: 'No products found' })
        }
        return res.status(200).json({ message: "Success", products: products })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error' })
    }
}

const getProductCount = async (req, res) => {
    try {
      const productCount = await Product.countDocuments(); // Get total count
      console.log('Product count:', productCount); 
      res.status(200).json({ count: productCount });
    } catch (error) {
      console.error('Error getting product count:', error); // Log any error
      res.status(500).json({ error: 'Error getting product count' });
    }
  };

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getNewArrivals,
    mostRatedProducts,
    getProductsByCategory,
    getProductsByBrands,
    getProductCount
}