import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import type CartItemAttributes from "../types/cartItem.type";

const useCartItem = () => {
    const [cartItems, setCartItems] = useState<CartItemAttributes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const getItems = async () => {
            try {
                const res = await axiosInstance.get("/cart/");
                if (isMounted) {
                    setCartItems(res.data.data.cart);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to load cart items");
                    setLoading(false);
                }
            }
        };

        getItems();

        return () => {
            isMounted = false;
        };
    }, []);

    return { cartItems, loading, error };
};

export default useCartItem;
