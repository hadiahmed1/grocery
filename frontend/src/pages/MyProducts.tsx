import { Link, Outlet } from "react-router-dom";
import { useSellerProducts } from "../hooks/useSellerProducts";

const MyProducts = () => {
    const { loading } = useSellerProducts();

    if (loading) return (<>Loading...</>)
    return (
        <>
            <h1 className="text-5xl">Seller Dashboard</h1>
            <Link className="text-3xl text-emerald-300" to='add'>Add Product</Link>
            <Outlet />
        </>
    )
}

export default MyProducts;