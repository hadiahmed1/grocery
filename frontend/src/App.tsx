import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Product from './pages/Product'

function App() {
  return (
    <>
      <nav className='w-full flex justify-between'>
        <Link to='/'>Home</Link>
        <Link to='/product'>Product</Link>
        <Link to='/cart'>Cart</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product' element={<Product />} />
      </Routes>
    </>
  )
}

export default App
