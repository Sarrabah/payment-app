const orders = require('../models/Orders');
const orderDetails = require('../models/OrderDetails');
const product = require('../models/Product');

const OrderController = {
    insertOrder: async (req, res) => {
        const data = req.body;
        try {
            const result = await orders.insertOrder(data.totalPriceCmd);
            const idOrder = result.insertId;
            for (let i = 0; i < data.productDetails.length; i++) {
                const productDetail = data.productDetails[i];
                orderDetails.insertOrderDetail(idOrder, productDetail.idProduct, productDetail.quantity);
                product.updateQuantity(productDetail.idProduct, productDetail.quantity);
            }
            res.status(200).json({ message: "Order accepted" })
        } catch (error) {
            console.error('Order failed:', error);
            res.status(500).json({ message: "Internal Server Error" });
        }

    }
}

module.exports = OrderController;