import { useEffect } from "react";
import OrderCard from "../components/OrderCard";
import { useOrder } from "../hooks/useOrder"
import Notification from "../components/Notification"

const Orders = () => {
    const { orders, refetch } = useOrder();
    useEffect(() => { refetch() },[])
    return (
        <div className="flow-root px-3">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map(order => <OrderCard key={order.id} order={order} />)}
            </ul>
            <Notification />
        </div>
    )
}
export default Orders