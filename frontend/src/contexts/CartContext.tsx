import { createContext, useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import useUser from "../hooks/useUser";
import type CartItemAttributes from "../types/cartItem.type";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

type CartContextType = {
    cartItems: CartItemAttributes[];
    loading: boolean;
    error: string | null;
    addItem: (product_id: string, count?: number) => Promise<boolean>;
    deleteItem: (id: string) => Promise<void>;
    refetch: () => Promise<void>;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItemAttributes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const { user } = useUser();
    const fetchCart = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await axiosInstance.get("/cart/");
            setCartItems(res.data.data.cart);
        } catch (error) {
            console.log(error)
            setError("Failed to load cart items:");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (error) toast.error("ERROR:" + error);
    }, [error]);
    useEffect(() => {
        fetchCart();
        setError(null);
    }, [location]);

    const addItem = async (product_id: string, count: number = 1) => {
        try {
            setLoading(true);
            const res = await axiosInstance.post("/cart/", { product_id, count });
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
            setCartItems((prev) => prev.filter((item) => item.id !== id));
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