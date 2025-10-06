//  crete prod model that contain name, price, description, category, imageUrl
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    imageUrl: { type: String, required: true }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;