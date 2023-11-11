const pool = require('../db.js');

const OrderDetails = {
    insertOrderDetail: async (orderId, productId, soldQuantity) => {
        try {
            const query = 'INSERT INTO orderdetails (orderId, productId, soldQuantity) VALUES (?, ?, ?)';
            const [result] = await pool.execute(query, [orderId, productId, soldQuantity]);
            return result;
        } catch (error) {
            console.error('Error insert order details  in the table orders detail', error);
            throw (error);
        }
    }
};

module.exports = OrderDetails;