import { createContext } from "react";
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