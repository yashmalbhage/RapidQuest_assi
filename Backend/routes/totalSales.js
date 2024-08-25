const express = require('express');
const router = express.Router();
const totalSalesController = require('../controllers/totalSalesController.js');

router.get('/:interval', totalSalesController.getTotalSales);

module.exports = router;