import Product from '../models/product.model';
import ProductAttributes, { ProductCreationAttributes } from '../types/product.type';
import { Request, Response } from 'express';
import ApiResponse from '../helper/ApiResponse';
import ApiError from '../helper/ApiError';
import asyncHandler from '../helper/asyncHandler';

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const product: ProductCreationAttributes = req.body;
    product.seller_id = (req as any).user.id;
    const newProduct = Product.build(product);
    await newProduct.save();

    return res.status(200).send(new ApiResponse("Product created successfully", { product: newProduct }));
})