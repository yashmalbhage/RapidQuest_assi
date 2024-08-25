const express = require('express');
const router = express.Router();
const repeatCustomersController = require('../controllers/repeatCustomersController');

router.get('/:interval', repeatCustomersController.getRepeatCustomers);

module.exports = router;