import OrderCard from "../components/OrderCard";
import { useOrder } from "../hooks/useOrder"

const Orders = () => {
    const { orders } = useOrder();
    return (
        <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map(order => <OrderCard key={order.id} order={order} />)}
            </ul>
        </div>
    )
}
export default Orders