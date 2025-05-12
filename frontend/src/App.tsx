import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  return (
    <>
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
    </>
  )
}

export default App
