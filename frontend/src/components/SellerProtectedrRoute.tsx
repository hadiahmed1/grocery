import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

const SellerProtectedRoute = () => {
    const { user } = useUser();
    return ((user?.role === 'seller') ? <Outlet /> : <Navigate to='/login' />)
}

export default SellerProtectedRoute;