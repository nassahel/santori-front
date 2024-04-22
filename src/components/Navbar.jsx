import React from 'react'
import { TiShoppingCart } from "react-icons/ti";
import { BiSolidUserCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';
import LogoTransparente from "/assets/img/logo-transparente.png"
import Searcher from './Searcher';

const Navbar = () => {
  return (
    <div className='h-[4rem] hidden shadow-md text-white gap-2 bg-orange-500 lg:flex sticky top-0 z-30 items-center justify-between pl-4 pr-3'>
      <Link to="/" className='font-bold text-2xl xl:w-1/5'>
        <img src={LogoTransparente} alt="" className='h-16' />
      </Link>
      <div className='flex justify-center flex-grow max-w-[60rem] '>
        <Searcher type='1' />
      </div>
      <div className='flex  gap-3 font-semibold items-center justify-end'>
        <Link className='border-b-2 border-transparent hover:border-white duration-300' to="/">Inicio</Link>
        <Link className='border-b-2 border-transparent hover:border-white duration-300' to="about">Nosotros</Link>
        <Link className='border-b-2 border-transparent hover:border-white duration-300' to="/admin/*">Administración</Link>
        <Link to="/user/login" className='flex items-center gap-2 border px-2 py-1 rounded-md hover:bg-orange-400 duration-300'>
          <BiSolidUserCircle size='25' />
          <p>Ingresar</p>
        </Link>
        <Link to="/orders" className='border-l border-l-neutral-300 pl-2 py-1 duration-300'><TiShoppingCart size='25' /></Link>


      </div>
    </div>
  )
}

export default Navbar