import { useEffect, useState, useRef, useCallback } from "react";
import type ProductAttributes from "../types/product.type";
import axiosInstance from "../lib/axiosInstance";
import ProductCard from "../components/ProductCard";

const LIMIT = 10;

const Home = () => {
    const [products, setProducts] = useState<ProductAttributes[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const lastProductRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();//disconnecting previously observed element
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage(prev => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const getProducts = async (currentPage: number) => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/product', {
                params: { page: currentPage, limit: LIMIT }
            });
            const newProducts = res.data.data.products as ProductAttributes[];
            setProducts(prev => [...prev, ...newProducts]);
            setHasMore(res.data.data.hasMore);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts(page);
    }, [page]);

    return (
        <>
            PRODUCTS
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                {products.map((product, index) => {
                    const isLast = index === products.length - 1;
                    return (
                        <div ref={isLast ? lastProductRef : null} key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    );
                })}
            </div>
            {loading && <p>Loading...</p>}
        </>
    );
};

export default Home;
