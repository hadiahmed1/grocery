import Order from "../models/order.model";
import OrderItem from "../models/orderItem.model";
import asyncHandler from "../helper/asyncHandler";
import ApiError from "../helper/ApiError";
import ApiResponse from "../helper/ApiResponse";
import { Request, Response } from "express";
import httpStatus from "../constants/httpStatusCode";
import Product from "../models/product.model";
import CartItem from "../models/cartItem.model";

const createOrderItem = async (order_id: string, product_id: string, quantity: number = 1) => {
    const product = await Product.findByPk(product_id);
    if (product) {
        const orderItem = OrderItem.build({
            order_id,
            product_id,
            quantity,
            price: (product.mrp * quantity) * ((100 - (product.discount_percent || 0)) / 100)

        });
        await orderItem.save();
    }
}

//buyer
export const orderItem = asyncHandler(async (req: Request, res: Response) => {
    //finding buyer
    const { user } = req;
    const { product_id, quantity = 1 } = req.body;
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    //finding product
    const product = await Product.findByPk(product_id);
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    //creating order
    const order = Order.build({ user_id: user.id });
    //creating orderItem
    createOrderItem(order.id, product_id, quantity);
    //saving
    await order.save();
    return res.status(httpStatus.OK).send(new ApiResponse("Item ordered successfully", { order }));
});

export const orderCart = asyncHandler(async (req: Request, res: Response) => {
    //finding buyer
    const { user } = req;
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    //finding products from cart
    const cartItems = await CartItem.findAll({ where: { user_id: user.id } });
    //creating order
    const order = Order.build({ user_id: user.id });
    //creating orderItems for each cart item
    cartItems.forEach(async cartItem => {
        createOrderItem(order.id, cartItem.product_id, cartItem.count);
        cartItem.destroy();//removing item from cart
    });
    //saving
    await order.save();
    return res.status(httpStatus.OK).send(new ApiResponse("Cart ordered successfully", { order }));
});

export const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
    //finding buyer
    const { user } = req;
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    const order = await Order.findOne({
        where: {
            id: req.params.id,
            user_id: user.id
        }
    });
    if (!order) throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
    if (order.status !== 'ordered') throw new ApiError(httpStatus.BAD_REQUEST, "Can't cancell order");

    order.status = "cancelled";
    order.save();
    return res.status(httpStatus.OK).send(new ApiResponse("Order cancelled", {}));
});

export const getOrder = asyncHandler(async (req: Request, res: Response) => {
    const { user } = req;
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    //finding order
    const order = await Order.findOne({
        where: {
            id: req.params.id,
            user_id: user.id
        }
    });
    if (!order) throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
    //finding order items
    const orderItems = await OrderItem.findAll({
        where: { order_id: order.id }
    });

    return res.status(httpStatus.OK).send(new ApiResponse("Orders", { orderItems }));
});

//seller & buyer
export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
    const { user } = req;
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    //finding order
    const orders = await Order.findAll({
        where: {
            user_id: user.id
        }
    });
    return res.status(httpStatus.OK).send(new ApiResponse("Order", { orders }));
});
