import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

const ProtectedRoute = () => {
    const { user } = useUser();
    return (user ? <Outlet /> : <Navigate to='/login' />)
}

export default ProtectedRoute;