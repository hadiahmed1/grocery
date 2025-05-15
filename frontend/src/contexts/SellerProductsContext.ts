import { createContext } from "react";
import type ProductAttributes from "../types/product.type";

type SellerProductsContextType = {
    products: ProductAttributes[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};

export const SellerProductsContext = createContext<SellerProductsContextType | null>(null);