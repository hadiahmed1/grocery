import './App.css'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import UserContext from './contexts/UserContext'
import { useState } from 'react'
import type { UserAttributes } from './types/user.type'
import ProtectedRoute from './components/ProtectedRoute'
import Orders from './pages/Orders'
import { CartProvider } from './contexts/CartContext'
import { OrderProvider } from './contexts/OrderContext'
import { ToastContainer } from 'react-toastify'
import NavBar from './components/NavBar'
import MyProducts from './pages/MyProducts'
import SellerProtectedRoute from './components/SellerProtectedrRoute'

function App() {
  const [user, setUser] = useState<UserAttributes | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartProvider>
        <OrderProvider>

          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute />} >

              <Route path='/cart' element={<Cart />} />
            </Route>
            <Route element={<ProtectedRoute />} >
              <Route path='/orders' element={<Orders />} />
            </Route>
            <Route element={<SellerProtectedRoute />}>
              <Route path='/myproducts' element={<MyProducts />} />
            </Route>
          </Routes>
          <ToastContainer theme='dark' />

        </OrderProvider>
      </CartProvider>
    </UserContext.Provider>
  )
}

export default App
