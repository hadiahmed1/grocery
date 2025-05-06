import express from 'express';
import { verifyAccessToken } from '../middleware/verifyToken';
import { addToCart, getCart } from '../controllers/cart.controllers';

const cartRouter = express.Router();

cartRouter.post('/', verifyAccessToken, addToCart);
cartRouter.get('/', verifyAccessToken, getCart);

export default cartRouter;