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
    //function to delete
    const deleteItem = async (id: string) => {
        try {
            await axiosInstance.delete(`/cart/${id}`);
            setCartItems(prev => prev.filter(item => item.id !== id));
            console.log(id, " deleted")
        } catch (err) {
            console.log("Failed to delete item:", err);
        }
    };

    return { cartItems, loading, error, deleteItem };
};

export default useCartItem;
