import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import LogoTransparente from "/assets/img/logo-transparente.png"
import Searcher from './Searcher';
import CartIcon from './CartIcon';
import avatarDefault from '/assets/img/avatardefault.webp'
import Swal from 'sweetalert2';
import { AppContext } from '../context/ContextProvider';

const Navbar = ({ numPedidos }) => {
  const { globalData } = useContext(AppContext);
  const [endSessionBtn, setEndSessionBtn] = useState(false)


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
        Swal.fire("Saved!", "", "success");
        window.location.reload();
      }
    });
  }

  return (
    <div className='h-[4rem] hidden shadow-md text-white gap-2 bg-orange-500 lg:flex sticky top-0 z-30 items-center justify-between pl-4 pr-3'>
      <Link to="/" className='text-2xl xl:w-1/5'>
        <img src={LogoTransparente} alt="" className='h-16' />
      </Link>
      <div className='flex justify-center flex-grow max-w-[60rem] '>
        <Searcher type='1' />
      </div>
      <div className='flex  items-center justify-end'>
        <Link className='border-b-2 border-transparent hover:border-white duration-300 px-2' to="/">Inicio</Link>
        <Link className='border-b-2 border-transparent hover:border-white duration-300 px-2' to="about">Nosotros</Link>
        {
          globalData.loggedUser == undefined ?
            <Link to="/user/login" className='flex items-center gap-2 border px-2 py-1 rounded-md hover:bg-orange-400 duration-300'>
              <AiOutlineUser size='20' />
              <p>Ingresar</p>
            </Link>
            :
            <div className='relative'>
              <button onClick={() => setEndSessionBtn(!endSessionBtn)} className='flex gap-1 items-center border-l border-neutral-300 h-full ml-2 px-2 hover:bg-orange-400 duration-200 '>
                <img src={globalData.loggedUser.userImage !== '' ? globalData.loggedUser.userImage : avatarDefault} alt="user image" className='w-8' />
                <p className='capitalize'>{globalData.loggedUser.name.split(' ')[0]}</p>
              </button>
              {
                endSessionBtn && <div className='absolute w-[8.7rem] top-[2rem] left-2 flex flex-col items-center text-center text-sm bg-neutral-100 border border-orange-500  text-neutral-800'>
                  {(globalData.loggedUser.rol === 'ADMIN' || globalData.loggedUser.rol === 'SUPERADMIN') && <Link to="/admin/pedidos" className='p-2 border-b border-neutral-400 w-full hover:bg-neutral-200 duration-200'>
                    Aministración
                  </Link>}
                  <button onClick={closeSession} className='p-2  w-full hover:bg-red-300 duration-200'>
                    Cerrar Sesión
                  </button>
                </div>
              }
            </div>

        }

        <CartIcon numPedidos={numPedidos} />

      </div>
    </div>
  )
}

export default Navbar