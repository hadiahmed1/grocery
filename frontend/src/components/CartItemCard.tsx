import type CartItemAttributes from "../types/cartItem.type";
import type ProductAttributes from "../types/product.type";
import ProductCard from "./ProductCard";

const CartItemCard = ({ cartItem }: { cartItem: CartItemAttributes }) => {
    const { name, mrp, discount_percent, photo, quantity, seller_id, description, count } = cartItem;
    const product: ProductAttributes = {
        id: cartItem.product_id,
        mrp, name, discount_percent, photo, quantity, seller_id, description, count
    }
    return (
        <>
            <ProductCard cartItemId={cartItem.id} product={product} />
        </>
    )
}

export default CartItemCard;