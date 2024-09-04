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

module.exports = {
    addToWishlist,
}