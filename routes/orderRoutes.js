// orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.post('/add', orderController.addOrder);
router.get('/', orderController.getOrders);


module.exports = router;
