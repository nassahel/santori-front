import React from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import LogoTransparente from "/assets/img/logo-transparente.png"
import Searcher from './Searcher';
import CartIcon from './CartIcon';

const Navbar = () => {
  return (
    <div className='h-[4rem] hidden shadow-md text-white gap-2 bg-orange-500 lg:flex sticky top-0 z-30 items-center justify-between pl-4 pr-3'>
      <Link to="/" className='text-2xl xl:w-1/5'>
        <img src={LogoTransparente} alt="" className='h-16' />
      </Link>
      <div className='flex justify-center flex-grow max-w-[60rem] '>
        <Searcher type='1' />
      </div>
      <div className='flex  gap-3 items-center justify-end'>
        <Link className='border-b-2 border-transparent hover:border-white duration-300' to="/">Inicio</Link>
        <Link className='border-b-2 border-transparent hover:border-white duration-300' to="about">Nosotros</Link>
        <Link onClick={() => alert("Ups! 😥 Página en desarrollo. \nEsta funcion estara disponible proximamente!")} className='border-b-2 border-transparent hover:border-white duration-300' to="/admin/*">Administración</Link>
        <Link to="/user/login" className='flex items-center gap-2 border px-2 py-1 rounded-md hover:bg-orange-400 duration-300'>
          <AiOutlineUser size='20' />
          <p>Ingresar</p>
        </Link>
        <CartIcon />

      </div>
    </div>
  )
}

export default Navbar