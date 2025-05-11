import { useEffect, useState } from "react"
import type ProductAttributes from "../types/product.type";
import axiosInstance from "../lib/axiosInstance";



const Product = () => {
    const [products, setProducts] = useState<ProductAttributes[]>([]);
    const getProducts = async () => {
        const res = await axiosInstance.get('/product');
        const products = res.data.data.products as ProductAttributes[];
        console.log(products);
        setProducts(products);
    }
    useEffect(() => {
        getProducts();
    },[]);
    return (
        <>
            PRODUCTS

        </>
    );
}

export default Product;