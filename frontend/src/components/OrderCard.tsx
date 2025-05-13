import type OrderAttributes from "../types/order.type";

const OrderCard = ({ order }: { order: OrderAttributes }) => {
    return (<>

        <li className="py-3 sm:py-4">
            <div className="flex items-center">
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {order.id}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {order.status}
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