import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
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
        <CartIcon/>
      </div>
      <div className={`${sideBar ? "w-full" : "w-0"} duration-200 fixed top-0 bottom-0 left-0 right-0 bg-neutral-100  overflow-hidden h-screen`}>
        <button onClick={() => setSidebar(false)} className='block ml-auto mr-2 mt-2'><AiOutlineClose className="h-8 w-8 text-black" /></button>
        <Link onClick={() => setSidebar(false)} to='/' className='nav-btn'>Home</Link>
        <Link onClick={() => setSidebar(false)} to='about' className='nav-btn'>Nosotros</Link>
        <Link onClick={() => setSidebar(false)} to='user/login' className='nav-btn'>Iniciar Sesión</Link>
      </div>
    </nav>
  )
}

export default NavMovil