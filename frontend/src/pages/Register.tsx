import { useForm, type SubmitHandler } from "react-hook-form"
import axiosInstance from "../lib/axiosInstance"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
type Inputs = {
    email: string
    user_password: string
    username: string
}

const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await axiosInstance.post('user/signup', data);
            if (res.data.success) {
                toast.success("User Registered: A verification email has been sent to you")
                navigate('/');//navigation to home
            }
        } catch (error) {
            if (error instanceof AxiosError) toast.error(error.response?.data.message || "Unable to Register");
            else toast.error("Something went wrong. Try agin latter.")
        }
    }

    return (
        <div className="flex flex-col items-center">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)} >
                {/* EMAIL */}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input defaultValue="hadiahmed0112+@gmail.com" {...register("email", { required: true })}
                        type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    {errors.email && <span>Email is required</span>}
                </div>
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input  {...register("username", { required: true })}
                        type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    {errors.email && <span>Email is required</span>}
                </div>
                {/* PASSWORD */}
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input {...register("user_password", { required: true })}
                        type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    {errors.user_password && <span>Password is required</span>}
                </div>
                {/*SUBMIT  */}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Register
                </button>
            </form>
            <Link className="text-indigo-700 my-4 mx-auto" to="/login">Have an Account? Login</Link>
        </div>
    )
}

export default Register;