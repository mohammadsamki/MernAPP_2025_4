//  create crud operations for product
const Product = require('../models/products');
//  create product
const createProduct = async (req,res)=>{
    const { name, price, description, category, imageUrl } = req.body;
    try {
        const product = new Product({
            name,
            price,
            description,
            category,
            imageUrl
        })
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    }
    catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ message: error.message });
    }
}
//  get all products
const getAllProducts = async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: error.message });
    }
}
//  get product by id
const getProductById = async (req,res)=>{
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error.message);
        res.status(500).json({ message: error.message });
    }
}
//  update product by id
const updateProductById = async (req,res)=>{
    const id = req.params.id;
    const { name, price, description, category, imageUrl } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, {
            name,
            price,
            description,
            category,
            imageUrl
        }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product });
    }
    catch (error) { 
        console.error('Error updating product:', error.message);
        res.status(500).json({ message: error.message });
    }
}
//  delete product by id
const deleteProductById = async (req,res)=>{
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ message: error.message });
    }
}
module.exports = { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById }