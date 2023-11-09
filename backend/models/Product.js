const pool = require('../db.js');

const Product = {
    findAll: async () => {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM products');
            return rows;
        } catch (error) {
            console.error('Error fetching products from database:', error);
            throw error;
        }
    }
};

module.exports = Product;