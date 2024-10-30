import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Orders from '../pages/Orders'
import AboutUs from '../pages/AboutUs'
import ProtectedRoutes from './ProtectedRoutes';
import NavMovil from '../components/NavMovil'
import Searcher from '../components/Searcher'
import AlertModal from '../components/AlertModal'


const Layout = () => {
    const [alertModal, setAlertModal] = useState(true);

    const [auth, setAuth] = useState(false);
    const userAdmin = () => {
        setAuth(true);
    };

    return (
        <div className='min-h-screen flex flex-col'>
            {alertModal && <AlertModal setAlertModal={setAlertModal} />}
            <Navbar />
            <NavMovil />
            <Searcher />
            <Routes>
                <Route path='/:category?/' element={<Home />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/about' element={<AboutUs />} />
                <Route path='/admin/*' element={<ProtectedRoutes auth={auth} userAdmin={userAdmin} />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default Layout