import Order from "../models/order.model";
import OrderItem from "../models/orderItem.model";
import asyncHandler from "../helper/asyncHandler";
import ApiError from "../helper/ApiError";
import ApiResponse from "../helper/ApiResponse";
import { Request, Response } from "express";
import httpStatus from "../constants/httpStatusCode";
import Product from "../models/product.model";
import { or } from "sequelize";


//buyer
export const orderItem = asyncHandler(async (req: Request, res: Response) => {
    //finding buyer
    const { user } = req.body;
    const { productId, quantity = 1 } = req.body;
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    //finding product
    const product = await Product.findByPk(productId);
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    //creating order
    const order = Order.build({ user_id: user.id });
    //creating orderItem
    const orderItem = OrderItem.build({
        order_id: order.id,
        product_id: product.id,
        quantity,
        price: (product.mrp * quantity) * ((100 - (product.discount_percent || 0)) / 100)

    });
    //saving
    await order.save();
    await orderItem.save();
    return res.status(httpStatus.OK).send(new ApiResponse("Item ordered successfully", { order }));
});

export const orderCart = asyncHandler(async (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send(new ApiResponse("", {}));
});

export const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send(new ApiResponse("", {}));
});

export const getOrder = asyncHandler(async (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send(new ApiResponse("", {}));
});

//seller & buyer
export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send(new ApiResponse("", {}));
});
