import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import UserContext from './contexts/UserContext'
import { useState } from 'react'
import type { UserAttributes } from './types/user.type'

function App() {
  const [user, setUser] = useState<UserAttributes | null>(null);
  return (

    <>
      <UserContext.Provider value={{ user, setUser }}>

        <nav className='w-full flex justify-between'>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/cart'>Cart</Link>
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
