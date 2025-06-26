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
import sendOrderConfirmation from "../helper/sendOrderConfirmation";
import pusher from "../config/pusherConfig";
import orderSummary, { getOrderTotal } from "../helper/orderSummary";
import stripe from "../config/stripeConfig";
import Stripe from "stripe";

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
    //sending email
    const summary = await orderSummary(order.id)
    try {
        sendOrderConfirmation(user.email, summary);
        await pusher.trigger(`${user.id}`, 'notification', {
            notification: summary
        });
        
    } catch (error) {
        console.log("error while sending notificaion");
        console.log(error);
        throw new ApiError(400, "Notification not sent")
    }
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
    //sending email
    sendOrderConfirmation(user.email, order.delivery_date.toISOString());
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

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
    const { user } = req;
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    //finding order
    const orders = await sequelize.query(`
        SELECT o.id,o.status, o.isPaid,o.delivery_date, o.createdAt, 
        SUM(oi.price) as total  FROM 
        orders o JOIN orderitems oi
        ON o.id = oi.order_id
        WHERE o.user_id = :userId
        GROUP BY o.id
        ORDER BY o.updatedAt DESC;
`, {
        replacements: { userId: user.id },
        type: QueryTypes.SELECT
    });

    return res.status(httpStatus.OK).send(new ApiResponse("Order", { orders }));
});

export const payForOrder = asyncHandler(async (req: Request, res: Response) => {

    const { orderID } = req.params;
    const order = await Order.findByPk(orderID);
    if (!order) throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
    if (order.isPaid) throw new ApiError(httpStatus.CONFLICT, "Already Paid")

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: order.id
                    },
                    unit_amount: (await getOrderTotal(orderID)) * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:5173/orders',
        cancel_url: 'http://localhost:5173/orders',
        metadata: {
            order_id: orderID,
        },
    });

    res.status(200).json({ url: session.url });
});

export const updatePaymentStatus = asyncHandler(async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;

    let event;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            const orderID = session.metadata?.order_id;

            if (orderID) {
                const order = await Order.findByPk(orderID);
                if (order) {
                    order.isPaid = true;
                    await order.save();
                    console.log(`Order ${orderID} marked as paid`);
                }
            }
        }
    } catch (err) {
        if (err instanceof Error) {
            console.log(err);
            console.error('Webhook error:', err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
    }
    res.json({ received: true });
});