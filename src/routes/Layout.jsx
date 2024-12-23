import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Orders from '../pages/Orders'
import AboutUs from '../pages/AboutUs'
import NavMovil from '../components/NavMovil'
import Searcher from '../components/Searcher'
import AlertModal from '../components/modals/AlertModal'
import MisPedidos from '../pages/MisPedidos'
import ProtectedLoginRoutes from './ProtectedLoginRoutes'


const Layout = () => {
    const [alertModal, setAlertModal] = useState(false)

    const location = useLocation().pathname;
    const isHome = location === '/'

    return (
        <div className='min-h-screen flex flex-col'>
            {alertModal && <AlertModal setAlertModal={setAlertModal} />}
            <Navbar />
            <NavMovil />
            <div className='pt-16'>
                {
                    isHome && <div className={`justify-center flex-grow`}>
                        <Searcher type='2' />
                    </div>
                }
                <Routes>
                    <Route path='/:category?/' element={<Home />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/about' element={<AboutUs />} />
                    <Route path='/pedidos' element={
                        <ProtectedLoginRoutes>
                            <MisPedidos />
                        </ProtectedLoginRoutes>
                    } />
                </Routes>
                <Footer />
            </div>

        </div>
    )
}

export default Layout