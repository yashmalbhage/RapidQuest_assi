const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('Order', OrderSchema, 'shopifyOrders');