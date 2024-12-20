import React, { useState } from 'react'
import Pclogo from '/assets/img/pclogo.png'
import { Link, Route, Routes } from 'react-router-dom';
import { MdExitToApp } from "react-icons/md";
import Logo from '/assets/img/logo-transparente.png'
import ListadoUsuarios from '../components/admin-actions/ListadoUsuarios';
import ListadoPedidos from '../components/admin-actions/ListadoPedidos';
import ListadoMenus from '../components/admin-actions/ListadoMenus';


function Admin() {
  const [btnActive, setBtnActive] = useState('')

  const styleBlack = (title) => ` ${btnActive === title ? 'bg-neutral-700' : 'bg-neutral-800'} border-neutral-600 hover:bg-neutral-700 duration-300`

  const menu = [
    { title: 'Pedidos', link: 'pedidos', },
    { title: 'Menus', link: 'menus', },
    { title: 'Usuarios', link: 'usuarios', },
  ]

  return (
    <div>
      <section className='lg:hidden bg-neutral-200 h-screen flex text-center text-neutral-600  flex-col items-center justify-center px-4'>
        <p className='font-bold text-lg'>Santori Delivery</p>
        <img src={Pclogo} alt="logo PC" className='w-1/3' />
        <p>Esta pagina solo puede verse desde una pc</p>
        <p>Por favor conectese desde una Pc para usar el modo administrador</p>
        <Link to="/" className='bg-neutral-700 px-2 py-1 text-neutral-300 hover:bg-neutral-600 rounded-sm mt-4'>Volver al inicio</Link>
      </section>

      <section className='min-h-screen hidden lg:flex flex-col'>
        <header className='bg-neutral-800 h-[3rem] border-b-2 flex  border-neutral-600  text-white'>
          <Link to="/" className={`flex items-center justify-center gap-2 w-60 h-full border-r ${styleBlack} `}>
            <MdExitToApp />
            <span>Salir</span>
          </Link>
          <section className='flex items-center justify-center grow'>
            <h2>Administración</h2>
          </section>
        </header>
        <section className='flex grow bg-neutral-300'>
          <aside className='bg-neutral-800 w-60 flex flex-col justify-between  text-white'>
            <div>
              <div className={`${styleBlack} border-b-2 py-1`}>
                <img src={Logo} alt="logo delivery" className='h-16 mx-auto ' />
              </div>
              <ul className='flex flex-col text-center'>
                {
                  menu.map((item, i) => (
                    <Link to={item.link} key={i} className={`${styleBlack(item.title)} border-b-2 py-2`} >{item.title}</Link>
                  ))
                }
              </ul>
            </div>

            <div className='text-center py-3'>
              <p>Version 1.0.0</p>
            </div>
          </aside>
          <main className='w-10/12 p-6 mx-auto '>
            <Routes>
              <Route path="/usuarios" element={<ListadoUsuarios setBtnActive={setBtnActive} />} />
              <Route path="/pedidos" element={<ListadoPedidos setBtnActive={setBtnActive} />} />
              <Route path="/menus" element={<ListadoMenus setBtnActive={setBtnActive} />} />
            </Routes>
          </main>
        </section>
      </section>
    </div>
  )
}

export default Admin;