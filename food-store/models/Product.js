const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    size: { type: Number, required: true, min: [17, 'Size must be at least 17'], max: [24, 'Size must be below 24'] },
    toppings: [{ type: String }]
});

module.exports = mongoose.model('Product', productSchema);