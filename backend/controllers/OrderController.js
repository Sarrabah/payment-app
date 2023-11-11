const orders = require('../models/Orders');
const orderDetails = require('../models/OrderDetails');
const product = require('../models/Product');
const pool = require('../db');
const { Mutex } = require('async-mutex');
const lock = new Mutex();

const OrderController = {
    insertOrder: async (req, res) => {
        const connection = await pool.getConnection();
        await connection.execute('SET autocommit=0;');
        const release = await lock.acquire();
        const data = req.body;
        try {
            await connection.beginTransaction();
            console.log('Transaction started');
            const result = await orders.insertOrder(connection, data.totalPriceCmd);
            const idOrder = result.insertId;
            for (let i = 0; i < data.productDetails.length; i++) {
                const productDetail = data.productDetails[i];
                await orderDetails.insertOrderDetail(connection, idOrder, productDetail.idProduct, productDetail.quantity);
                await product.updateQuantity(connection, productDetail.idProduct, productDetail.quantity);
            }
            await connection.commit();
            console.log('Transaction commited');
            res.status(200).json({ message: "Order accepted" })
        } catch (error) {
            await connection.rollback();
            console.log('Transaction rollbacked');
            res.status(500).json({ message: "Internal Server Error-order failed:", error });
        } finally {
            release();
            connection.release();
        }
    }
}

module.exports = OrderController;