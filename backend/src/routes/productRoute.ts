import express from 'express';
import { createProduct, editProductById, getProducts, getProductById, getMyProducts } from '../controllers/product.controllers';
import { verifySeller } from '../middleware/verifyToken'
import validateData from '../middleware/validateSchema';
import productCreationSchema from '../types/joi/productCreationSchema';
import productEditSchema from '../types/joi/productEditSchema';
import { upload } from '../middleware/multer.middleware';

const productRouter = express.Router();
//protected routes
productRouter.post('/', verifySeller, upload.fields([{ name: "photo", maxCount: 1 }]), validateData(productCreationSchema), createProduct);
productRouter.patch('/:id', verifySeller, validateData(productEditSchema), editProductById);
productRouter.get('/myproducts', verifySeller, getMyProducts);
//public routes
productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);

export default productRouter;