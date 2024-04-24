import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineUser, AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { useState } from 'react';
import LogoTransparente from "/assets/img/logo-transparente.png"
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

const NavMovil = () => {
  const [sideBar, setSidebar] = useState(false)
  return (
    <nav className='fixed w-full items-center h-14 shadow-md bg-orange-500 z-50 lg:hidden'>
      <div className="flex justify-between items-center pr-4">
        <GiHamburgerMenu onClick={() => setSidebar(true)} className={` ${sideBar && "hidden"} h-10 w-10 text-white mt-2 ml-2 cursor-pointer`} />
        <img src={LogoTransparente} alt="" className="h-14" />
        <CartIcon />
      </div>
      <div onClick={() => setSidebar(false)} className={`${sideBar ? "w-full" : "w-0"} bg-black/65 fixed top-0 bottom-0 left-0 right-0`}></div>
      <div className={`${sideBar ? "w-2/3" : "w-0"} shadow border-r border-neutral-300 duration-200 fixed top-0 bottom-0 left-0 right-0 bg-neutral-100 text-nowrap overflow-hidden h-screen`}>
        <button onClick={() => setSidebar(false)} className='block ml-auto mr-2 mt-2'><AiOutlineClose className="h-8 w-8 text-black" /></button>
        <Link onClick={() => setSidebar(false)} to='/' className='nav-btn'>
          <AiOutlineHome className="mr-2" />
          <p>Home</p>
        </Link>
        <Link onClick={() => setSidebar(false)} to='about' className='nav-btn'>
          <AiOutlineInfoCircle className="mr-2" />
          <p>Nosotros</p>
        </Link>
        <Link onClick={() => setSidebar(false)} to='user/login' className='nav-btn'>
          <AiOutlineUser className="mr-2" />
          <p>Iniciar Sesión</p>
        </Link>
      </div>


    </nav>
  )
}

export default NavMovil