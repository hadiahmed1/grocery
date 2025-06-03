import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "react-toastify";

const LogoutBtn = () => {
    const { setUser } = useUser()
    const logout = () => {
        setUser(null);
        axiosInstance.get('user/logout')//request to logout
            .then(res => {
                if (res.data.success === true) toast.success("Logout successfull")
            });
    }
    return (<Link to='/login' onClick={() => logout()} className='text-xl text-red-500'>Logout</Link>)
}
export default LogoutBtn;