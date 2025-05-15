import AddProductForm from "../components/AddProductForm";
import { useSellerProducts } from "../hooks/useSellerProducts";

const MyProducts = () => {
    const { loading, products } = useSellerProducts();
    console.log("My Products", products);

    if (loading) return (<>Loading...</>)
    return (
        <>
            <h1 className="text-5xl">Seller Dashboard</h1>
            {/* <AddProductForm /> */}
            <div>
                <h2 className="text-3xl">My Products</h2>
                {products.map(product => <p>{product.name}</p>)}
            </div>
        </>
    )
}

export default MyProducts;