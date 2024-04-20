import React from 'react'
import { TiShoppingCart } from "react-icons/ti";
import { BiSolidUserCircle, BiSearchAlt2 } from "react-icons/bi";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='h-[4rem] shadow-md text-white bg-orange-500 flex sticky top-0 z-30 items-center justify-between px-4'>
      <Link to="/" className='font-bold text-2xl w-1/3'>Santori Delivery</Link>
      <div className='flex justify-center w-1/3 '>
        <div className='bg-white w-full rounded flex text-black justify-between overflow-hidden pl-3 pr-2 items-center'>
          <input type="search" name="" id="" placeholder='Buscá una comida...' className='hover:outline-none w-full h-12 py-1 focus:outline-none ' />
          <BiSearchAlt2 color='orange' size="29" className='cursor-pointer' />
        </div>

      </div>
      <div className='flex w-1/3 gap-4 font-semibold text-lg items-center justify-end'>
        <Link className='border-b-2 border-transparent hover:border-white duration-300' to="/">Inicio</Link>
        <Link className='border-b-2 border-transparent hover:border-white duration-300' to="about">Nosotros</Link>
        <Link className='border-b-2 border-transparent hover:border-white duration-300' to="/admin/*">Administración</Link>
        <Link to="/user/login"><BiSolidUserCircle size='40' /></Link>
        <Link to="/orders"><TiShoppingCart size='40' /></Link>


      </div>
    </div>
  )
}

export default Navbar