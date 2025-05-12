import CartItemCard from "../components/CartItemCard";
import useCartItem from "../hooks/useCartItems";

const Cart = () => {
    const { cartItems, error, loading } = useCartItem();
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