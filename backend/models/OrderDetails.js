const OrderDetails = {
    insertOrderDetail: async (connection, orderId, productId, soldQuantity) => {
        try {
            const query = 'INSERT INTO orderdetails (orderId, productId, soldQuantity) VALUES (?, ?, ?)';
            const [result] = await connection.execute(query, [orderId, productId, soldQuantity]);
            return result;
        } catch (error) {
            console.error('Error insert order details  in the table orders detail', error);
            throw (error);
        }
    }
};

module.exports = OrderDetails;