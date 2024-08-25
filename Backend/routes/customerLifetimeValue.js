const express = require('express');
const router = express.Router();
const customerLifetimeValueController = require('../controllers/customerLifetimeValueController');

router.get('/', customerLifetimeValueController.getCustomerLifetimeValue);

module.exports = router;