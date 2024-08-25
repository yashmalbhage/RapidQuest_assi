const express = require('express');
const router = express.Router();
const geographicalDistributionController = require('../controllers/geographicalDistributionController');

router.get('/', geographicalDistributionController.getGeographicalDistribution);

module.exports = router;