const pool = require('../db');

const Product = {
    findAll: async () => {
        try {
            const [rows] = await pool.execute('SELECT * FROM products');
            return rows;
        } catch (error) {
            console.error('Error fetching products from database:', error);
            throw error;
        }
    },
    updateQuantity: async (connection, id, soldOutQuantity) => {
        let rows;
        try {
            const req = 'SELECT inventory FROM products WHERE id = (?) ';
            [rows] = await pool.execute(req, [id]);
        } catch (error) {
            console.error('Error fetching products from database:', error);
            throw error;
        }
        try {
            const inventory = rows[0].inventory - soldOutQuantity;
            const query = 'UPDATE products SET inventory = (?) WHERE id =(?)';
            const result = await connection.execute(query, [inventory, id]);
        } catch (error) {
            console.error('Error updating product quantity', error);
            throw error;
        }
    }
};

module.exports = Product