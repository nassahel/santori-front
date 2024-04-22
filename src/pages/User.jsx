import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Swal from 'sweetalert2'
import bg from "/assets/img/bg-login.jpg"
import Login from '../components/Login';
import Register from '../components/Register';
import { MdArrowBackIosNew } from "react-icons/md";

function User() {

  return (
    <div className=' flex flex-col bg-neutral-100 h-screen '>
      <nav className='flex h-[4rem] bg-orange-500 items-center text-white text-xl font-semibold shadow z-10'>
        <Link to='/' className='flex items-center gap-2 h-full pl-1 pr-7 duration-300 hover:bg-red-500'>
          <MdArrowBackIosNew />
          <p>Volver</p>
        </Link>

      </nav>
      <div className='flex w-full h-full items-center justify-center overflow-hidden '>
        <div className='hidden lg:block lg:w-1/2 overflow-hidden'>
          <img src={bg} alt="" className=' object-cover' />
        </div>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </div>
  )
}

export default User;






