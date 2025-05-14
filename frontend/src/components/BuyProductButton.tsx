import { useOrder } from "../hooks/useOrder";

const BuyProductButton = ({ id, quantity }: { id: string, quantity: number }) => {
    const { orderProduct } = useOrder();
    return (<button //Buy Now
        onClick={() => orderProduct(id, quantity)}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium
              hover:bg-blue-700 transform transition-all duration-300 hover:scale-[1.02]
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
        Buy Now
    </button>);
}

export default BuyProductButton;