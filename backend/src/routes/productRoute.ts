import express from 'express';
import { createProduct, getProduct, getProductById } from '../controllers/product.controllers';
import { verifySeller } from '../middleware/verifyToken'

const productRouter = express.Router();
//protected routes
productRouter.post('/', verifySeller, createProduct);
productRouter.get('/', verifySeller, getProduct);
//public routes
productRouter.get('/:id', getProductById);

export default productRouter;