import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import type CartItemAttributes from "../types/cartItem.type";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

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
            } catch (error) {
                if (error instanceof AxiosError) toast.error(error.response?.data.message);
                if (isMounted) {
                    setError("Failed to load cart items:");
                    setLoading(false);
                }
            }
        };

        getItems();

        return () => {
            isMounted = false;
        };
    }, []);

    //add to Cart
    const addItem = async (product_id: string, count: number = 1) => {
        try {
            const { data } = await axiosInstance.post('cart/', { product_id, count });
            console.log(data)
            return data.data.success;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    //function to delete
    const deleteItem = async (id: string) => {
        try {
            await axiosInstance.delete(`/cart/${id}`);
            setCartItems(prev => prev.filter(item => item.id !== id));
            console.log(id, " deleted")
        } catch {
            setError("Failed to delete item" + id);
        }
    };

    return { cartItems, loading, error, deleteItem, addItem };
};

export default useCartItem;
