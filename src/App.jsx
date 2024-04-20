import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import User from './pages/User'
import Orders from './pages/Orders'
import { CartProvider } from './components/CartContext'
import NotFound from './pages/NotFound'
import Layout from './routes/Layout'
import ProtectedRoutes from './routes/ProtectedRoutes'

function App() {
 

  return (
    <div className='principal flex flex-col min-h-screen bg-neutral-100'>
      <CartProvider>
        <Routes>
          <Route path='/user/*' element={<User />} />
          <Route path='/*' element={<Layout />} /> 
          <Route path='*' element={<NotFound />} />
        </Routes>
      </CartProvider>
    </div>
  );
}


export default App
