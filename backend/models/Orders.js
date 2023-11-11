const pool = require('../db.js');

const Orders = {
    insertOrder: async (totalPrice) => {
        try {
            const query = 'INSERT INTO `orders` (totalPrice) VALUES (?) ';
            const [result] = await pool.execute(query, [totalPrice]);
            return result;
        } catch (error) {
            console.error('Error insert order in the table orders', error);
            throw (error);
        }
    }
}

module.exports = Orders;

