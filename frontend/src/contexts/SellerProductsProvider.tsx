import { useEffect, useState } from "react";
import type ProductAttributes from "../types/product.type";
import useUser from "../hooks/useUser";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import { SellerProductsContext } from "./SellerProductsContext";

export const SellerProductsProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<ProductAttributes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();
    const location = useLocation();

    const fetchMyProducts = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await axiosInstance.get("product/myproducts");
            setProducts(res.data.data.products);
        } catch (error) {
            if (error instanceof AxiosError) toast.error(error.response?.data.message);
            setError("Failed to load Products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    useEffect(() => {
        if (location.pathname === '/myproducts')
            fetchMyProducts();
        setError(null);

    }, [location]);


    return (
        <SellerProductsContext.Provider value={{ error, loading, products, refetch: fetchMyProducts }}>
            {children}
        </SellerProductsContext.Provider>
    )
}