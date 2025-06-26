import './App.css'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import UserContext from './contexts/UserContext'
import { useEffect, useState } from 'react'
import type { UserAttributes } from './types/user.type'
import ProtectedRoute from './components/ProtectedRoute'
import Orders from './pages/Orders'
import { CartProvider } from './contexts/CartContextProvider'
import { OrderProvider } from './contexts/OrderContextProvider'
import { ToastContainer } from 'react-toastify'
import NavBar from './components/NavBar'
import MyProducts from './pages/MyProducts'
import SellerProtectedRoute from './components/SellerProtectedrRoute'
import Register from './pages/Register'
import MyProductList from './components/MyProductsList'
import AddProductForm from './components/AddProductForm'
import EditProductForm from './components/EditProductForm'
import ReviewForm from './components/ReviewForm'
import axiosInstance from './lib/axiosInstance'
import { socket } from './socket'

function App() {

  useEffect(() => {
    function onConnect() {
      console.log('✅ Socket connected:', socket.id);
    }

    function onDisconnect() {
      console.log('❌ Socket disconnected');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Clean up
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('user');
        console.log(res);
        setUser(res.data?.data?.user || null);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  },[])
  const [user, setUser] = useState<UserAttributes | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartProvider>
        <OrderProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/login' element={<Login />} />

            <Route path='/register' element={<Register />} />

            <Route element={<ProtectedRoute />} >
              <Route path='/cart' element={<Cart />} />
            </Route>

            <Route element={<ProtectedRoute />} >
              <Route path='/orders' element={<Orders />} />
            </Route>

            <Route element={<ProtectedRoute />} >
              <Route path='/review/:id' element={<ReviewForm />} />
            </Route>

            <Route element={<SellerProtectedRoute />}>
              <Route path='/myproducts' element={<MyProducts />} >
                <Route index element={<MyProductList />} />
                <Route path='add' element={<AddProductForm />} />
                <Route path=':id' element={<EditProductForm />} />
              </Route>
            </Route>

          </Routes>
          <ToastContainer theme='dark' />

        </OrderProvider>
      </CartProvider>
    </UserContext.Provider>
  )
}

export default App
