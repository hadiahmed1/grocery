import express from 'express';
import { verifyAccessToken } from '../middleware/verifyToken';
import { cancelOrder, getMyOrders, getOrder, orderCart, orderItem, payForOrder } from '../controllers/order.contollers';
import validateData from '../middleware/validateSchema';
import orderProductSchema from '../types/joi/orderProductSchema';

const orderRouter = express.Router();

orderRouter.get('/', verifyAccessToken, getMyOrders);
orderRouter.get('/:id', verifyAccessToken, getOrder);
orderRouter.post('/product', verifyAccessToken, validateData(orderProductSchema), orderItem);
orderRouter.post('/cart', verifyAccessToken, orderCart);
orderRouter.patch('/:id', verifyAccessToken, cancelOrder);
orderRouter.post('/pay/:orderID', verifyAccessToken, payForOrder);

export default orderRouter;