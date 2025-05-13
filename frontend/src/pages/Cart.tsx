import CartItemCard from "../components/CartItemCard";
import { useCart } from "../hooks/useCart";

const Cart = () => {
    const { cartItems, error, loading } = useCart();
    if (loading) return <>Loading....</>
    if (error) return <>Error....</>
    if (!loading) console.log(cartItems);

    return (
        <div>
            {cartItems.map(item => <CartItemCard key={item.id} cartItem={item} />)}
        </div>
    );
}

export default Cart;