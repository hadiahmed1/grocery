import { useEffect, useState } from "react"
import type ProductAttributes from "../types/product.type";
import axiosInstance from "../lib/axiosInstance";
import ProductCard from "../components/ProductCard";
const Home = () => {
    const [products, setProducts] = useState<ProductAttributes[]>([]);
    const getProducts = async () => {
        const res = await axiosInstance.get('/product');
        const products = res.data.data.products as ProductAttributes[];
        console.log(products);
        setProducts(products);
    }
    useEffect(() => {
        getProducts();
    }, []);
    return (
        <>
            PRODUCTS
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {products.length > 0 &&
                    products.map(product => <ProductCard product={product} />)}
            </div>

        </>
    );
}

export default Home;