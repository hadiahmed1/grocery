import type CartItemAttributes from "../types/cartItem.type";
import type ProductAttributes from "../types/product.type";
import ProductCard from "./ProductCard";

//wrapper for product card
const CartItemCard = ({ cartItem }: { cartItem: CartItemAttributes }) => {
    const { name, mrp, discount_percent, photo, quantity, seller_id, description, count, createdAt, updatedAt } = cartItem;

    const product: ProductAttributes = {//creating product from cartItem
        id: cartItem.product_id,
        mrp, name,
        discount_percent,
        photo,
        quantity,
        seller_id,
        description,
        count,
        createdAt: (new Date(createdAt)),
        updatedAt: (new Date(updatedAt)),
        deletedAt: null
    }

    return (
        <>
            <ProductCard cartItemId={cartItem.id} product={product} />
        </>
    )
}

export default CartItemCard;