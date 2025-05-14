import { createContext, useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import useUser from "../hooks/useUser";
import type OrderAttributes from "../types/order.type";
import { useLocation } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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
    const location = useLocation();
    const { refetch, cartItems } = useCart();

    const fetchOrder = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await axiosInstance.get("order/");
            setOrderItems(res.data.data.orders);
        } catch (error) {
            if (error instanceof AxiosError)
                setError(error.response?.data.message || "Unable to order Product");
            else
                setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { setError(null) }, [location]);
    useEffect(() => {
        if (error) toast.error("ERROR" + error);
    }, [error])

    const orderProduct = async (product_id: string, quantity: number = 1) => {
        try {
            setLoading(true);
            const res = await axiosInstance.post("/order/product", { product_id, quantity });
            await fetchOrder(); // refresh state
            toast.success("Order placed");
            return res.data.data.success;
        } catch (error) {
            if (error instanceof AxiosError)
                setError(error.response?.data.message || "Unable to order Product");
            else
                setError("Unable to order Product");
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
            toast.success("Order Cancelled");
        } catch (error) {
            if (error instanceof AxiosError)
                setError(error.response?.data.message || "Unable to cancel order");
            else
                setError("Unable to cancelOrder");
        } finally {
            setLoading(false);
        }
    };

    const orderCart = async () => {
        try {
            setLoading(true);
            if (cartItems.length > 0) {
                const res = await axiosInstance.post("/order/cart");
                await fetchOrder(); // refresh state
                await refetch(); //refresh Cart
                toast.success("Cart Ordered");
                return res.data.data.success;
            } else setError("Can't order: Cart is empty");
        } catch (error) {
            if (error instanceof AxiosError)
                setError(error.response?.data.message || "Unable to order Cart");
            else
                setError("Unable to Order Cart");
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