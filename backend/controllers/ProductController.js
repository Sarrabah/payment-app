const Product = require('../models/Product');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.findAll();
            res.setHeader('Content-Type', 'application/json');
            res.json({"catalog": products});
        } catch (error) {
            res.status(500);
            res.json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = productController;