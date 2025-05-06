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
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.findAll({
        where: { seller_id: (req as any).user.id }
    });
    return res.status(200).send(new ApiResponse("Product created successfully", { products }));
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    if(!product) throw new ApiError(404, "No product found");
    return res.status(200).send(new ApiResponse("Product created successfully", { product }));
});