import CartItem from '../models/cartItem.model';
import Product from '../models/product.model';
import { Response } from 'express';
import ApiResponse from '../helper/ApiResponse';
import ApiError from '../helper/ApiError';
import asyncHandler from '../helper/asyncHandler';
import {AuthenticatedRequest} from '../types/AuthenticatedRequest';
import httpStatus from '../constants/httpStatusCode'

export const addToCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { product_id, count } = req.body;
    if (! await Product.findByPk(product_id)) throw new ApiError(404, "Product not found");

    const cartitem = CartItem.build({
        user_id: req.user.id,
        product_id,
        count
    });
    await cartitem.save();

    return res.status(httpStatus.OK).send(new ApiResponse("Item added to cart", { cartitem }));
});

export const getCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const cart = await CartItem.findAll({
        where: {
            user_id: req.user.id
        }
    })

    return res.status(httpStatus.OK).send(new ApiResponse("Cart", { cart }));
});