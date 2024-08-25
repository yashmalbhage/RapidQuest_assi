const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('Customer', CustomerSchema, 'shopifyCustomers');