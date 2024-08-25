const express = require('express');
const router = express.Router();
const newCustomersController = require('../controllers/newCustomersController');

router.get('/:interval', newCustomersController.getNewCustomers);

module.exports = router;