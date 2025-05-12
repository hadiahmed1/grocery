import CartItem from '../models/cartItem.model';
import Product from '../models/product.model';
import { Request, Response } from 'express';
import ApiResponse from '../helper/ApiResponse';
import ApiError from '../helper/ApiError';
import asyncHandler from '../helper/asyncHandler';
import httpStatus from '../constants/httpStatusCode'
import sequelize from "../config/sequelizeConfig";
import { QueryTypes } from 'sequelize';

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    const { product_id, count = 1 } = req.body;
    if (! await Product.findByPk(product_id)) throw new ApiError(404, "Product not found");

    const cartitem = CartItem.build({
        user_id: req.user.id,
        product_id,
        count
    });
    await cartitem.save();

    return res.status(httpStatus.OK).send(new ApiResponse("Item added to cart", { cartitem }));
});

export const getCart = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

    const cart = await sequelize.query(`
        SELECT  
        c.id, c.product_id, c.count, c.createdAt, c.updatedAt, p.name, p.mrp, p.mrp, p.quantity, p.unit, p.photo 
        FROM cartitem c
        JOIN products p ON p.id = c.product_id
        WHERE c.user_id  = :user_id
`, {
        replacements: { user_id: req.user.id },
        type: QueryTypes.SELECT
    });

    return res.status(httpStatus.OK).send(new ApiResponse("Cart", { cart }));
});

export const getCartItemByID = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    const cartItem = await CartItem.findOne({
        where: {
            id: req.params.id,
            user_id: req.user.id
        }
    });
    if (!cartItem) throw new ApiError(httpStatus.NOT_FOUND, "Cart item not found");
    return res.status(httpStatus.OK).send(new ApiResponse("Cart", { cartItem }));
});

export const deleteCartItemByID = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    //finding item
    const cartItem = await CartItem.findOne({
        where: {
            id: req.params.id,
            user_id: req.user.id
        }
    });
    if (!cartItem) throw new ApiError(httpStatus.NOT_FOUND, "Cart item not found");
    //deleting item
    cartItem.destroy();

    return res.status(httpStatus.OK).send(new ApiResponse("Deleted item successfully", { cartItem }));
});

export const editCartItemByID = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    //finding item
    const cartItem = await CartItem.findOne({
        where: {
            id: req.params.id,
            user_id: req.user.id
        }
    });
    if (!cartItem) throw new ApiError(httpStatus.NOT_FOUND, "Cart item not found");
    //update item
    cartItem.set(req.body);
    cartItem.save();

    return res.status(httpStatus.OK).send(new ApiResponse("Edited item successfully", { cartItem }));
});