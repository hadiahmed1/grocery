import express from 'express';
import { verifyAccessToken } from '../middleware/verifyToken';
import { addToCart, getCart, getCartItemByID } from '../controllers/cart.controllers';

const cartRouter = express.Router();

cartRouter.post('/', verifyAccessToken, addToCart);
cartRouter.get('/', verifyAccessToken, getCart);
cartRouter.get('/:id', verifyAccessToken, getCartItemByID);

export default cartRouter;