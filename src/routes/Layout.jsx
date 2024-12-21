import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Orders from '../pages/Orders'
import AboutUs from '../pages/AboutUs'
import NavMovil from '../components/NavMovil'
import Searcher from '../components/Searcher'
import AlertModal from '../components/modals/AlertModal'


const Layout = () => {
    const [numPedidos, setNumPedidos] = useState(0)
    const [alertModal, setAlertModal] = useState(false)

    return (
        <div className='min-h-screen flex flex-col'>
            {alertModal && <AlertModal setAlertModal={setAlertModal} />}
            <Navbar numPedidos={numPedidos} />
            <NavMovil />
            <Searcher />
            <Routes>
                <Route path='/:category?/' element={<Home setNumPedidos={setNumPedidos} />} />
                <Route path='/orders' element={<Orders setNumPedidos={setNumPedidos} />} />
                <Route path='/about' element={<AboutUs />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default Layout