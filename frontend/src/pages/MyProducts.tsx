import { Link, Outlet } from "react-router-dom";
import { useSellerProducts } from "../hooks/useSellerProducts";

const MyProducts = () => {
    const { loading, products } = useSellerProducts();
    console.log("My Products", products);

    if (loading) return (<>Loading...</>)
    return (
        <>
            <h1 className="text-5xl">Seller Dashboard</h1>
            <Link to='add'>Add Product</Link>
            <Outlet />
        </>
    )
}

export default MyProducts;