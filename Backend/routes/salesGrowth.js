const express = require('express');
const router = express.Router();
const salesGrowthController = require('../controllers/salesGrowthController');

router.get('/:interval', salesGrowthController.getSalesGrowth);

module.exports = router;