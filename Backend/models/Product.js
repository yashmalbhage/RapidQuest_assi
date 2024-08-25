const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('Product', ProductSchema, 'shopifyProducts');