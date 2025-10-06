const Category = require('../models/category.js');
//  create category
const createCategory = async (req,res)=>{
    const { name, description, imageUrl } = req.body;
    try {
        const category = new Category({
            name,
            description,
            imageUrl
        })
        await category.save();
        res.status(201).json({ message: 'Category created successfully', category });
    }
    catch (error) {
        console.error('Error creating category:', error.message);
        res.status(500).json({ message: error.message });
    }
}
//  get all categories
const getAllCategories = async (req,res)=>{
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({ message: error.message });
    }
}
//  get category by id
const getCategoryById = async (req,res)=>{
    const id = req.params.id;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category:', error.message);
        res.status(500).json({ message: error.message });
    }
}
//  update category by id
const updateCategoryById = async (req,res)=>{
    const id = req.params.id;
    const { name, description, imageUrl } = req.body;   
    try {
        const category = await Category.findByIdAndUpdate(id, {
            name,
            description,
            imageUrl
        }, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        console.error('Error updating category:', error.message);
        res.status(500).json({ message: error.message });
    }
}
//  delete category by id
const deleteCategoryById = async (req,res)=>{
    const id = req.params.id;
    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error.message);
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}