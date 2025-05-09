import express from 'express';
import { verifyAccessToken } from '../middleware/verifyToken';
import { cancelOrder, getMyOrders, getOrder, orderCart, orderItem } from '../controllers/order.contollers';

const orderRouter = express.Router();

orderRouter.get('/', verifyAccessToken, getMyOrders);
orderRouter.get('/:id', verifyAccessToken, getOrder);
orderRouter.post('/:productID', verifyAccessToken, orderItem);
orderRouter.post('/cart', verifyAccessToken, orderCart);
orderRouter.patch('/:id/cancell', verifyAccessToken, cancelOrder);


export default orderRouter;