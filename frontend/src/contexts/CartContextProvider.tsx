import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import useUser from "../hooks/useUser";
import type CartItemAttributes from "../types/cartItem.type";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItemAttributes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const { user } = useUser();
    const fetchCart = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await axiosInstance.get("/cart/");
            setCartItems(res.data.data.cart);
        } catch (error) {
            if (error instanceof AxiosError) setError(error.response?.data.message);
            else setError("Failed to load cart items:");
        } finally {
            setLoading(false);
        }
    },[user]);
    useEffect(() => {
        if (error) toast.error("ERROR:" + error);
    }, [error]);
    useEffect(() => {
        if (location.pathname === '/cart')
            fetchCart();
        setError(null);
    }, [fetchCart, location]);

    const addItem = async (product_id: string, count: number = 1) => {
        try {
            setLoading(true);
            const res = await axiosInstance.post("/cart/", { product_id, count });
            toast.success("Item added to cart");
            await fetchCart(); // refresh state
            return res.data.data.success;
        } catch {
            setError("Unable to add Item to Cart")
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id: string) => {
        try {
            setLoading(true);
            await axiosInstance.delete(`/cart/${id}`);
            toast.success("Item removed from cart")
            setCartItems((prev:CartItemAttributes[]) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
            setError("Unable to remove Item from cart")
        } finally {
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, loading, error, addItem, deleteItem, refetch: fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};