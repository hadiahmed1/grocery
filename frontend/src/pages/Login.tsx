import { useForm, type SubmitHandler } from "react-hook-form"
import axiosInstance from "../lib/axiosInstance"
import useUser from "../hooks/useUser"
import { useNavigate } from "react-router-dom"

type Inputs = {
    email: string
    password: string
}

export default function Login() {
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const res = await axiosInstance.post('user/signin', data);
        setUser(res.data.data.user);
        console.log("Login Res",res);

        if(res.data.success) navigate('/');//navigation to home
    }

    return (
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)} >
            {/* EMAIL */}
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input defaultValue="hadiahmed0112+@gmail.com" {...register("email", { required: true })}
                    type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                {errors.email && <span>Email is required</span>}
            </div>
            {/* PASSWORD */}
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input {...register("password", { required: true })}
                    type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                {errors.password && <span>Password is required</span>}
            </div>
            {/*SUBMIT  */}
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        </form>

    )
}