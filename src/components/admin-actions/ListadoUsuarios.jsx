import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../services/users.services';
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const ListadoUsuarios = ({ setBtnActive }) => {
  const [usuarios, setUsuarios] = useState(null);

  useEffect(() => {
    setBtnActive('Usuarios')
    getAllUsers()
      .then(setUsuarios)
  }, [])


  return (
    <section className=''>
      <div className='flex justify-end'>
        <button className='bg-white py-2 px-4 my-2 rounded-md border-2 border-neutral-400 hover:border-black duration-200'>Agregar Usuario</button>
      </div>
      <div className='bg-white'>
         <div className='flex bg-neutral-800 text-white'>
        <p className='w-1/4 border px-2 py-1'>Rol</p>
        <p className='w-1/4 border px-2 py-1'>Nombre</p>
        <p className='w-1/4 border px-2 py-1'>Email</p>
        <p className='w-1/4 border px-2 py-1'>Direccion</p>
        <p className=' border bg-neutral-900 text-white px-2 py-1'><FaRegEdit /></p>
        <p className='bg-red-600 text-white border px-2 py-1'><FaRegTrashAlt /></p>
      </div>

      {
        usuarios ? usuarios.map((item, i) => (
          <div key={i} className='flex hover:bg-neutral-200 duration-200 '>
            <p className='w-1/4 border px-2 py-1'>{item.rol}</p>
            <p className='w-1/4 border px-2 py-1'>{item.name}</p>
            <p className='w-1/4 border px-2 py-1'>{item.email}</p>
            <p className='w-1/4 border px-2 py-1'>{item.direction}</p>
            <button className=' border px-2 py-1'><FaRegEdit /></button>
            <button className='text-red-600 border px-2 py-1'><FaRegTrashAlt /></button>
          </div>
        )) :
          <div>Cargando...</div>
      }
      </div>
     
    </section >
  )
}

export default ListadoUsuarios