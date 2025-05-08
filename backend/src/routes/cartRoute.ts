import express from 'express';
import { verifyAccessToken } from '../middleware/verifyToken';
import { addToCart, deleteCartItemByID, editCartItemByID, getCart, getCartItemByID } from '../controllers/cart.controllers';
import validateData from '../middleware/validateSchema';
import cartItemCreateionSchema from '../types/joi/cartItemCreateionSchema';
import cartItemeEditSchema from '../types/joi/cartItemEditSchema';

const cartRouter = express.Router();

cartRouter.get('/', verifyAccessToken, getCart);//get all items in cart

cartRouter.get('/:id', verifyAccessToken, getCartItemByID);
cartRouter.post('/', verifyAccessToken, validateData(cartItemCreateionSchema), addToCart);
cartRouter.delete('/:id', verifyAccessToken, deleteCartItemByID);
cartRouter.patch('/:id', verifyAccessToken, validateData(cartItemeEditSchema), editCartItemByID);
export default cartRouter;