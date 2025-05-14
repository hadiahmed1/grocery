import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import axiosInstance from "../lib/axiosInstance";

const LogoutBtn = () => {
    const { setUser } = useUser()
    const logout = () => {
        axiosInstance.get('user/logout').then(res => {
            console.log("logout:>>", res);
            if (res.data.success === true) {
                setUser(null);
            }
        });
    }
    return (<Link to='/login' onClick={() => logout()} className='text-xl text-red-500'>Logout</Link>)
}
export default LogoutBtn;