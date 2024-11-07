import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import User from './pages/User'
import Orders from './pages/Orders'
import NotFound from './pages/NotFound'
import Layout from './routes/Layout'
import ProtectedRoutes from './routes/ProtectedRoutes'

function App() {
  const [auth, setAuth] = useState(true);
  const userAdmin = () => {
      setAuth(true);
  };

  return (
    <div className='principal flex flex-col min-h-screen antialised bg-neutral-100 font-productsans'>
      
        <Routes>
          <Route path='/user/*' element={<User />} />
          <Route path='/*' element={<Layout />} /> 
          <Route path='*' element={<NotFound />} />
          <Route path='/admin/*' element={<ProtectedRoutes auth={auth} userAdmin={userAdmin} />} />
        </Routes>
    </div>
  );
}


export default App
