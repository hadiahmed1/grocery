import express from 'express';
import { createProduct, editProductById, getProduct, getProductById } from '../controllers/product.controllers';
import { verifySeller } from '../middleware/verifyToken'
import validateData from '../middleware/validateSchema';
import productCreationSchema from '../types/joi/productCreationSchema';
import productEditSchema from '../types/joi/productEditSchema';

const productRouter = express.Router();
//protected routes
productRouter.post('/', verifySeller, validateData(productCreationSchema), createProduct);
productRouter.patch('/:id', verifySeller, validateData(productEditSchema), editProductById);
//public routes
productRouter.get('/', getProduct);
productRouter.get('/:id', getProductById);

export default productRouter;