//  crete prod router
const express = require('express');
const { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } = require('../controllers/productControllers');
const router = express.Router();
//  import adminAuth middleware
const adminAuth = require('./adminAuth');

//  create product route
router.post('/create',adminAuth, createProduct);
//  get all products
router.get('/all', getAllProducts);
//  get product by id
router.get('/:id', getProductById);
//  update product by id
router.put('/update/:id',adminAuth, updateProductById);
//  delete product by id
router.delete('/delete/:id',adminAuth, deleteProductById);

//  export the router
module.exports = router;