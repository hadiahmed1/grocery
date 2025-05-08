import express from 'express';
import { createProduct, getProduct, getProductById } from '../controllers/product.controllers';
import { verifySeller } from '../middleware/verifyToken'
import validateData from '../middleware/validateSchema';
import productCreationSchema from '../types/joi/productCreationSchema';

const productRouter = express.Router();
//protected routes
productRouter.post('/', verifySeller, validateData(productCreationSchema), createProduct);
//public routes
productRouter.get('/', getProduct);
productRouter.get('/:id', getProductById);

export default productRouter;