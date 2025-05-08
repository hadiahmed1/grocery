import Product from '../models/product.model';
import { ProductCreationAttributes } from '../types/product.type';
import { Request, Response } from 'express';
import ApiResponse from '../helper/ApiResponse';
import ApiError from '../helper/ApiError';
import asyncHandler from '../helper/asyncHandler';
import httpStatus from '../constants/httpStatusCode';

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    //extraction product object
    const product: ProductCreationAttributes = req.body;
    //checking if user is present
    if(!req.user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    product.seller_id = req.user.id;
    if(!product.address_id)//setting product address to seller address if not metioned
        product.address_id= req.user.address_id;
    //creating new product
    const newProduct = Product.build(product);
    await newProduct.save();

    return res.status(httpStatus.OK).send(new ApiResponse("Product created successfully", { product: newProduct }));
});

export const getProduct = asyncHandler(async (_req: Request, res: Response) => {
    const products = await Product.findAll();//all products
    return res.status(httpStatus.OK).send(new ApiResponse("Product created successfully", { products }));
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    if(!product) throw new ApiError(httpStatus.NOT_FOUND, "No product found");
    return res.status(httpStatus.OK).send(new ApiResponse("Product created successfully", { product }));
});

export const editProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    //if product not found || other seller's product
    if(!product || product.seller_id != req.user?.id) throw new ApiError(httpStatus.NOT_FOUND, "No product found");
    //editing Product
    product.set(req.body);
    product.save();
    return res.status(httpStatus.OK).send(new ApiResponse("Product edited successfully", { product }));
});