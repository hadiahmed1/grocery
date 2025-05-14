import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
    const { user } = useUser();
    if (user) return (<Outlet />)
    else {
        toast.error("Please Login");
        return (<Navigate to='/login' />);
    }
}

export default ProtectedRoute;