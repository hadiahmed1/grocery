import { useContext } from "react";
import { SellerProductsContext } from "../contexts/SellerProductsContext";

export const useSellerProducts = () => {
    const context = useContext(SellerProductsContext);
    if (!context) throw new Error("useSellerProducys must be used within a CartProvider");
    return context;
};
