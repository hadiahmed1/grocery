import { createContext, useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import useUser from "../hooks/useUser";
import type OrderAttributes from "../types/order.type";

type OrderContextType = {
    orders: OrderAttributes[];
    loading: boolean;
    error: string | null;
    orderProduct: (product_id: string, quantity?: number) => Promise<boolean>;
    orderCart: () => Promise<boolean>
    cancelOrder: (id: string) => Promise<void>;
    refetch: () => Promise<void>;
};

export const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
    const [orderItems, setOrderItems] = useState<OrderAttributes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();

    const fetchOrder = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await axiosInstance.get("order/");
            setOrderItems(res.data.data.orders);
        } catch (error) {
            console.log(error)
            setError("Failed to load orders:");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [user]);

    const orderProduct = async (product_id: string, quantity: number = 1) => {
        try {
            setLoading(true);
            const res = await axiosInstance.post("/order/product", { product_id, quantity });
            await fetchOrder(); // refresh state
            return res.data.data.success;
        } catch {
            return false;
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async (id: string) => {
        try {
            setLoading(true);
            await axiosInstance.patch(`/order/${id}`);
            await fetchOrder();
        } catch (err) {
            console.error("Cancel failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const orderCart = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.post("/order/cart");
            await fetchOrder(); // refresh state
            return res.data.data.success;
        } catch {
            return false;
        } finally {
            setLoading(false);
        }
    }

    return (
        <OrderContext.Provider value={{ orders: orderItems, loading, error, orderProduct, cancelOrder, orderCart, refetch: fetchOrder }}>
            {children}
        </OrderContext.Provider>
    );
};