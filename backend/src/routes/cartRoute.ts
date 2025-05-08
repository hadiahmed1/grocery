import express from 'express';
import { verifyAccessToken } from '../middleware/verifyToken';
import { addToCart, deleteCartItemByID, editCartItemByID, getCart, getCartItemByID } from '../controllers/cart.controllers';

const cartRouter = express.Router();

cartRouter.get('/', verifyAccessToken, getCart);//get all items in cart

cartRouter.get('/:id', verifyAccessToken, getCartItemByID);
cartRouter.post('/', verifyAccessToken, addToCart);
cartRouter.delete('/:id', verifyAccessToken, deleteCartItemByID);
cartRouter.patch('/:id', verifyAccessToken, editCartItemByID);
export default cartRouter;