import express from 'express';
import { createProduct } from '../controllers/product.controllers';
import { verifySeller } from '../middleware/verifyToken'

const productRouter = express.Router();

productRouter.post('/', verifySeller, createProduct);

export default productRouter;