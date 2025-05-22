import Order from "../models/order.model";
import OrderItem from "../models/orderItem.model";
function getOrderDeliveryTime(order: Order) {
    const created = new Date(order.createdAt);
    const delivered = new Date(order.delivery_date);
    const diffMs = delivered.getTime() - created.getTime();
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const timeDiff =
        diffMin < 60
            ? `${diffMin} minute${diffMin === 1 ? '' : 's'}`
            : `${(diffMin / 60).toFixed(1)} hour${diffMin < 120 ? '' : 's'}`;

    return timeDiff;
}

const getOrderTotal = async (order_id: string) => {
    const orderItems = await OrderItem.findAll({ where: { order_id } });
    let total = 0;
    orderItems.forEach(orderItem => {
        total += orderItem.price * orderItem.quantity;
    })
    return total;
}

const orderSummary = async (id: string) => {
    const order = await Order.findByPk(id);
    if (!order) return "";
    const timeDiff = getOrderDeliveryTime(order);
    const total = await getOrderTotal(order.id);

    if (order.status === "ordered")
        return `Order of Rs. ${total} has been placed successfully. It will be delivred in ${timeDiff}`
    else
        return `Order of Rs. ${total} has been delivred`
}

export default orderSummary;