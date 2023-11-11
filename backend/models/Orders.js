const Orders = {
    insertOrder: async (connection, totalPrice) => {
        try {
            const query = 'INSERT INTO `orders` (totalPrice) VALUES (?) ';
            const [result] = await connection.execute(query, [totalPrice]);
            return result;
        } catch (error) {
            console.error('Error insert order in the table orders', error);
            throw (error);
        }
    }
}

module.exports = Orders;

