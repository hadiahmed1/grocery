import { useSellerProducts } from "../hooks/useSellerProducts";
import ProductCard from "./ProductCard";

const MyProductList = () => {
    const { loading, products } = useSellerProducts();
    console.log("My Products", products);

    if (loading) return (<>Loading...</>)
    return (
        <div>
            <h2 className="text-3xl">My Products</h2>
            {products.map(product => <ProductCard key={product.id} product={product} isMyProduct={true} />)}
        </div>
    )
}

export default MyProductList;