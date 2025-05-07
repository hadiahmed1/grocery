import Product from '../models/product.model';
import { ProductCreationAttributes } from '../types/product.type';
import { Request, Response } from 'express';
import ApiResponse from '../helper/ApiResponse';
import ApiError from '../helper/ApiError';
import asyncHandler from '../helper/asyncHandler';
import {AuthenticatedRequest} from '../types/AuthenticatedRequest';
import httpStatus from '../constants/httpStatusCode';

export const createProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const product: ProductCreationAttributes = req.body;
    product.seller_id = req.user.id;
    const newProduct = Product.build(product);
    await newProduct.save();

    return res.status(httpStatus.OK).send(new ApiResponse("Product created successfully", { product: newProduct }));
});

export const getProduct = asyncHandler(async (_req: Request, res: Response) => {
    const products = await Product.findAll();
    return res.status(httpStatus.OK).send(new ApiResponse("Product created successfully", { products }));
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    if(!product) throw new ApiError(httpStatus.NOT_FOUND, "No product found");
    return res.status(httpStatus.OK).send(new ApiResponse("Product created successfully", { product }));
});