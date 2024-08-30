const mongoose = require('mongoose')
const Cart = require('../models/cart')
const Customer = require('../models/customer')
const Product = require('../models/product')

const addToCart = async (req, res) => {
    const { product_id, customer_id } = req.body
    console.log(customer_id, product_id)
    try {
        const customer = await Customer.findById(customer_id)
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }
        const product = await Product.findById(product_id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        const cart = await Cart.findOne({ product_id: product_id, customer_id: customer_id });
        if (cart) {
            return res.status(400).json({ message: 'Product already in cart' });
        }
        await Cart.create({
            product_id: product_id,
            customer_id: customer_id,
            quantity: 1
        });
        return res.status(201).json({ message: 'Product added to cart' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getCartProducts = async (req, res) => {
    try {
        const products = await Cart.find()
            .populate('product_id', ['title', 'price', 'img_card'])
            .sort({ createdAt: -1 })
        if (!products) {
            return res.status(404).json({ message: 'No products in cart' })
        }
        return res.status(200).json({ message: 'Success', products: products })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}

const deleteProductFromCart = async (req, res) => {
    const { id } = req.params
    try {
        const cart = await Cart.findByIdAndDelete(id)
        if (!cart) {
            return res.status(404).json({ message: 'Product not found in cart' })
        }
        return res.status(200).json({ message: 'Product removed from cart' })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error', error: error.message
        })
    }
}

module.exports = {
    addToCart,
    getCartProducts,
    deleteProductFromCart
}