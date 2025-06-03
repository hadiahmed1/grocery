import { useState } from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import LogoutBtn from "./LogoutBtn";
import Notification from "./Notification";

const NavBar = () => {
  const [visiblity, setVisibility] = useState<"" | "hidden">("");
  const { user } = useUser()
  const toggleVisibility = () => {
    if (visiblity === "hidden") setVisibility("");
    else setVisibility("hidden");
  }
  return (


    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <h1 className="text-3xl font-bold text-blue-700">
          GroceryApp
        </h1>
        <button onClick={() => toggleVisibility()} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${visiblity} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to='/'
                className="text-xl block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page"
              >Home</Link>
            </li>
            <li>
              <Link to='/cart'
                className="text-xl block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page"
              >Cart</Link>
            </li>
            <li>
              <Link to='/orders'
                className="text-xl block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page"
              >My Orders</Link>
            </li>
            {(user?.role === 'seller') && <li>
              <Link to='/myproducts'
                className="text-xl block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page"
              >My Products</Link>
            </li>}
            <li>
              {user === null ? <Link className='text-xl text-emerald-300' to='/login'>Login</Link> : <LogoutBtn />}
            </li>
            <li>
              <Notification/>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default NavBar;