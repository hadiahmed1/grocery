import { useOrder } from '../hooks/useOrder';
const OrderCartBtn = () => {
    const { orderCart } = useOrder();

    return (<button //Add to cart
        className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium
              hover:bg-blue-700 transform transition-all duration-300 hover:scale-[1.02]
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => orderCart()}
    >
        OrderCart
    </button>)
}

export default OrderCartBtn;