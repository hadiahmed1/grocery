import type OrderAttributes from "../types/order.type";

function getOrderStatusInfo(status: string, createdAt: string | Date, deliveryDate: string | Date) {
    const statusColor =
        status === 'delivered' ? 'text-green-600' :
            status === 'cancelled' ? 'text-red-600' :
                'text-gray-600';

    const created = new Date(createdAt);
    const delivered = new Date(deliveryDate);
    const diffMs = delivered.getTime() - created.getTime();
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const timeDiff =
        diffMin < 60
            ? `${diffMin} minute${diffMin === 1 ? '' : 's'}`
            : `${(diffMin / 60).toFixed(1)} hour${diffMin < 120 ? '' : 's'}`;

    return { statusColor, timeDiff };
}


const OrderCard = ({ order }: { order: OrderAttributes }) => {
    const { statusColor, timeDiff } = getOrderStatusInfo(order.status, order.createdAt, order.delivery_date);
    return (<>

        <li className="px-4 py-3 sm:py-4">
            <div className="flex items-center">
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
                        Ordered on:{new Date(order.createdAt).toDateString()}
                    </p>
                    <p className={`text-xl truncate ${statusColor}`} >
                        {(order.status!== 'ordered')?order.status:("Will be delivred in:"+timeDiff)}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-blue-700 dark:text-white">
                    {order.total}
                </div>
            </div>
        </li>
    </>)
}

export default OrderCard;