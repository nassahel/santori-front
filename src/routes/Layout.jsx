import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Orders from '../pages/Orders'
import AboutUs from '../pages/AboutUs'
import ProtectedRoutes from './ProtectedRoutes';


const Layout = () => {

    const [auth, setAuth] = useState(false);
    const userAdmin = () => {
      setAuth(true);
    };

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/:category?/' element={<Home />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/about' element={<AboutUs />} />
                <Route path='/admin/*' element={<ProtectedRoutes auth={auth} userAdmin={userAdmin} />} />
            </Routes>
            <Footer className='footer' />
        </div>
    )
}

export default Layout