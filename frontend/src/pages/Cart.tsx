import useCartItem from "../hooks/useCartItems";

const Cart = () => {
    const { cartItems, error, loading } = useCartItem();
    if (loading) return <>Loading....</>
    if (error) return <>Error....</>
    if (!loading) console.log(cartItems);

    return (
        <div>
            {cartItems.map(item => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
}

export default Cart;