// customerRoutes.js

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.post('/phone', customerController.getCustomerByPhone);
router.post('/add', customerController.addCustomer);

module.exports = router;
