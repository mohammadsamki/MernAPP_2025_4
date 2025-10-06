const express = require('express');
const router = express.Router();
//  import adminAuth middleware
const adminAuth = require('./adminAuth');

//  import category controller
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} = require('../controllers/category');

//  create category route
router.post('/create', adminAuth, createCategory);
//  get all categories route
router.get('/all', getAllCategories);
//  get category by id route
router.get('/:id', getCategoryById);
//  update category by id route
router.put('/update/:id', adminAuth, updateCategoryById);
//  delete category by id route
router.delete('/delete/:id', adminAuth, deleteCategoryById);

//  export the router
module.exports = router;