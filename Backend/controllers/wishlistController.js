const mongoose = require('mongoose')
const Customer = require('../models/customer')
const Product = require('../models/product')
const Wishlist = require('../models/wishlist')

const addToWishlist = async (req, res) => {
    const { customer_id, product_id } = req.body
    try {
        const customer = await Customer.findById(customer_id)
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }
        const product = await Product.findById(product_id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        const wishlist = await Wishlist.findOne({ customer_id: customer_id, product_id: product_id })
        if (wishlist) {
            return res.status(400).json({ message: 'Product already in wishlist' })
        }
        await Wishlist.create({ customer_id: customer_id, product_id: product_id })
        res.status(201).json({ message: "Product added to wishlist" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

const getWishlistProducts = async (req, res) => {
    const {id} = req.query
    if(!id){
        return res.status(400).json({message: "Requested parameters are empty"})
    }
    try {
        const products = await Wishlist.find({ customer_id: id })
            .populate('product_id', ['title', 'price', 'img_card'])
            .sort({ createdAt: -1 })
        if (!products) {
            return res.status(404).json({ message: 'No products in wishlist' })
        }
        return res.status(200).json({ message: 'Success', products: products })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}

const deleteProductFromCart = async (req, res) => {
    const { id } = req.params
    try {
        const wishlist = await Wishlist.findByIdAndDelete(id)
        if (!wishlist) {
            return res.status(404).json({ message: 'Product not found in wishlist' })
        }
        return res.status(200).json({ message: 'Success' })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error', error: error.message
        })
    }
}

module.exports = {
    addToWishlist,
    getWishlistProducts,
    deleteProductFromCart
}