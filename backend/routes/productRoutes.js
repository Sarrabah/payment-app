const express = require('express');
const productController = require('../controllers/ProductController');
const router = express.Router();

router.get('/products', productController.getAllProducts);

module.exports = router;