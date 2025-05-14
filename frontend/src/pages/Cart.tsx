import CartItemCard from "../components/CartItemCard";
import OrderCartBtn from "../components/OrderCartBtn";
import { useCart } from "../hooks/useCart";

const Cart = () => {
    const { cartItems, error, loading } = useCart();
    if (loading) return <>Loading....</>
    if (error) return <p className="text-2xl text-red-600">{error}</p>
    if (!loading) console.log(cartItems);
    return (
        <div>
            <OrderCartBtn />
            {cartItems.map(item => <CartItemCard key={item.id} cartItem={item} />)}
        </div>
    );
}

export default Cart;