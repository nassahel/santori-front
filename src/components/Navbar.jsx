import React, { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom';
import LogoTransparente from "/assets/img/logo-transparente.png"
import Searcher from './Searcher';
import CartIcon from './CartIcon';
import avatarDefault from '/assets/img/avatardefault.webp'
import Swal from 'sweetalert2';
import { AppContext } from '../context/ContextProvider';

const Navbar = () => {
  const { userData } = useContext(AppContext);
  const [endSessionBtn, setEndSessionBtn] = useState(false)
  const dropdownRef = useRef(null);


  const location = useLocation().pathname;
  const isHome = location === '/'
    || location === '/sandwichs'
    || location === '/pastas'
    || location === '/minutas'
    || location === '/bebidas'
    || location === '/pizzas'



  const closeSession = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const isValidToken = localStorage.getItem('token')
        if (isValidToken) {
          localStorage.removeItem('token')
        }
        window.location.reload();
      }
    });
  }



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setEndSessionBtn(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='h-[4rem] hidden shadow-md text-white gap-2 bg-orange-500 lg:flex sticky top-0 z-30 items-center justify-between pl-4 pr-3'>
      <Link to="/" className='text-2xl xl:w-1/5'>
        <img src={LogoTransparente} alt="" className='h-16' />
      </Link>
      {
        isHome && <div className={`justify-center flex-grow`}>
          <Searcher type='1' />
        </div>
      }
      <div className='flex xl:w-1/5 items-center justify-end'>
        <Link className='border-b-2 border-transparent hover:border-white duration-300 px-2' to="/">Inicio</Link>
        <Link className='border-b-2 border-transparent hover:border-white duration-300 px-2' to="about">Nosotros</Link>
        <div className='border-x border-neutral-300 mx-2 px-1'>
          {
            userData == undefined ?
              <Link to="/user/login" className='flex items-center gap-2 border px-2 mx-3 py-1 rounded-md hover:bg-orange-400 duration-300'>
                <AiOutlineUser size='20' />
                <p>Ingresar</p>
              </Link>
              :
              <div className='relative' ref={dropdownRef}>
                <button onClick={() => setEndSessionBtn(!endSessionBtn)} className='flex gap-1 items-center h-full px-2 mx-2 hover:bg-orange-400 duration-200 '>
                  <img src={userData.userImage !== '' ? userData.userImage : avatarDefault} alt="user image" className='w-8' />
                  <p className='capitalize'>{userData.name.split(' ')[0]}</p>
                </button>
                {
                  endSessionBtn && <div className='absolute w-[8.7rem] top-[2rem] left-2 flex flex-col items-center text-center text-sm bg-neutral-100 border border-orange-500  text-neutral-800'>
                    {(userData.rol === 'ADMIN' || userData.rol === 'SUPERADMIN') && <Link to="/admin/pedidos" className='p-2 border-b border-neutral-400 w-full hover:bg-neutral-200 duration-200'>
                      Aministración
                    </Link>}
                    <Link to='/pedidos' onClick={() => setEndSessionBtn(false)} className='p-2 border-b border-neutral-400 w-full hover:bg-neutral-200 duration-200'>
                      Mis pedidos
                    </Link>
                    <button onClick={closeSession} className='p-2  w-full hover:bg-red-300 duration-200'>
                      Cerrar Sesión
                    </button>
                  </div>
                }
              </div>
          }
        </div>
        <CartIcon />
      </div>
    </div>
  )
}

export default Navbar