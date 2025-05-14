import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";

const SellerProtectedRoute = () => {
    const { user } = useUser();
    if (user?.role === "seller") return (<Outlet />)
    else if (user) {
        toast.error("Please Login as seller");
        return (<Navigate to='/login' />);
    }
    else {
        toast.error("Please Login");
        return (<Navigate to='/login' />);
    }
}

export default SellerProtectedRoute;