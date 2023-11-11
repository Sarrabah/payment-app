const express = require('express');
const orderController = require('../controllers/OrderController');
const router = express.Router();

router.post('/order', orderController.insertOrder);

module.exports = router;