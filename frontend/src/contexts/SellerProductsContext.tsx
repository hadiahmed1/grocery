import { createContext, useEffect, useState } from "react";
import type ProductAttributes from "../types/product.type";
import useUser from "../hooks/useUser";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

type SellerProductsContextType = {
    products: ProductAttributes[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};

export const SellerProductsContext = createContext<SellerProductsContextType | null>(null);

export const SellerProductsProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<ProductAttributes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();
    const location = useLocation();

    const fetchMyProducts = async () => {
        console.log("fetching....")
        if (!user) return;
        setLoading(true);
        try {
            const res = await axiosInstance.get("product/myproducts");
            console.log(res);
            setProducts(res.data.data.products);
        } catch (error) {
            console.log(error)
            setError("Failed to load Products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    useEffect(() => {
        fetchMyProducts();
        setError(null);
    }, [location]);


    return (
        <SellerProductsContext.Provider value={{ error, loading, products, refetch: fetchMyProducts }}>
            {children}
        </SellerProductsContext.Provider>
    )
}