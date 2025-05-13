import './App.css'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import UserContext from './contexts/UserContext'
import { useState } from 'react'
import type { UserAttributes } from './types/user.type'
import ProtectedRoute from './components/ProtectedRoute'
import Orders from './pages/Orders'
import LogoutBtn from './components/LogoutBtn'

function App() {
  const [user, setUser] = useState<UserAttributes | null>(null);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>

        <nav className='w-full flex justify-between px-5'>
          <Link className='text-2xl' to='/'>Home</Link>
          <Link className='text-2xl' to='/cart'>Cart</Link>
          <Link className='text-2xl' to='/orders'>My Orders</Link>
          {user === null ? <Link className='text-2xl text-emerald-300' to='/login'>Login</Link> : <LogoutBtn />}
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute />} >
            <Route path='/cart' element={<Cart />} />
          </Route>
          <Route element={<ProtectedRoute />} >
            <Route path='/orders' element={<Orders />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
