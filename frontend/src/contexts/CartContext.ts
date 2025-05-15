import { createContext } from "react";
import type CartItemAttributes from "../types/cartItem.type";

type CartContextType = {
    cartItems: CartItemAttributes[];
    loading: boolean;
    error: string | null;
    addItem: (product_id: string, count?: number) => Promise<boolean>;
    deleteItem: (id: string) => Promise<void>;
    refetch: () => Promise<void>;
};

export const CartContext = createContext<CartContextType | null>(null);