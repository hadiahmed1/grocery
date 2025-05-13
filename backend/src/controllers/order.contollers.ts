import Order from "../models/order.model";
import OrderItem from "../models/orderItem.model";
import asyncHandler from "../helper/asyncHandler";
import ApiError from "../helper/ApiError";
import ApiResponse from "../helper/ApiResponse";
import { Request, Response } from "express";
import httpStatus from "../constants/httpStatusCode";
import Product from "../models/product.model";
import CartItem from "../models/cartItem.model";
import sequelize from "../config/sequelizeConfig";
import { QueryTypes } from "sequelize";

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


    const results = await sequelize.query(`
  SELECT 
    o.order_id,
    o.id as orderitem_id, 
    o.product_id, 
    o.quantity as order_quantity, 
    o.price, 
    p.name, 
    p.quantity, 
    p.unit
  FROM orderitems o 
  JOIN products p ON o.product_id = p.id
  WHERE o.order_id = :orderId
`, {
        replacements: { orderId: order.id },
        type: QueryTypes.SELECT
    });

    return res.status(httpStatus.OK).send(new ApiResponse("Orders", { results }));
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
    const orders_withitems = await Promise.all(
        orders.map(async (order) => {
            const orderItems = await OrderItem.findAll({ where: { order_id: order.id } });
            const total = orderItems.reduce((sum, orderItem) => sum + Number(orderItem.dataValues.price), 0);
            const { id, user_id, status, delivery_date, createdAt, deletedAt, updatedAt } = order;
            return {
                id, user_id, status, delivery_date, createdAt, deletedAt, updatedAt, total, orderItems
            }
        })
    )
    return res.status(httpStatus.OK).send(new ApiResponse("Order", { orders: orders_withitems }));
});
