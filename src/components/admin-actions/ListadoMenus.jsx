import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getMenus } from '../../services/products.services';


const ListadoMenus = ({ setBtnActive }) => {
  const [menus, setMenus] = useState(null)

  useEffect(() => {
    setBtnActive('Menus')
    getMenus()
      .then(setMenus)
      .catch(error => console.log(error))
  }, [])

  const claseUlt = 'border h-full flex items-center justify-center w-1/3'
  return (
    <section>
      <div className='flex justify-end'>
        <button className='bg-white py-2 px-4 my-2  rounded-md border-2 border-neutral-400 hover:border-black duration-200'>Agregar Producto</button>
      </div>
      <div>
        {
          menus ?
            <section className='flex flex-col gap-2'>
              <article className='bg-neutral-800 text-white text-center flex rounded-sm'>
                <div className=' w-28 overflow-hidden border py-1'>
                  <p>Imagen</p>
                </div>
                <div className='flex grow justify-evenly items-center'>
                  <div className='flex h-full w-3/4'>
                    <p className=' text-center  h-full flex items-center justify-center w-1/3 border py-1'>Nombre</p>
                    <p className=' text-center  h-full flex items-center justify-center w-2/3 border py-1'>Descripción</p>
                  </div>
                  <div className='flex h-full w-1/4'>
                    <p className={claseUlt}>Categoría</p>
                    <p className={claseUlt}>Activo</p>
                    <p className={claseUlt}>Precio</p>
                  </div>
                  <div className='w-20 flex text-2xl items-center justify-center gap-2'>
                    <FaEdit />
                    <RiDeleteBin6Line />
                  </div>
                </div>
              </article>
              {
                menus.map((menu, i) => (
                  <article key={i} className='bg-white flex rounded-sm'>
                    <div className='h-28 w-28 overflow-hidden'>
                      <img src={menu.productImage} alt={menu.name} className='h-full object-cover' />
                    </div>
                    <div className='flex grow justify-evenly items-center'>
                      <div className='flex h-full w-3/4'>
                        <p className=' text-center border h-full flex items-center justify-center w-1/3'>{menu.name}</p>
                        <p className=' text-center border h-full flex items-center justify-center w-2/3'>{menu.description}</p>
                      </div>
                      <div className='flex h-full w-1/4'>
                        <p className={claseUlt}>{menu.category}</p>
                        <p className={claseUlt}>{menu.active === true ? 'Si' : 'No'}</p>
                        <p className={claseUlt}>${menu.price}</p>
                      </div>
                      <div className='w-20 flex flex-col text-2xl items-center justify-around gap-4'>
                        <FaEdit className='cursor-pointer' />
                        <RiDeleteBin6Line color='red' className='cursor-pointer' />
                      </div>
                    </div>
                  </article>
                ))
              }
            </section>
            :
            <p>Loading...</p>
        }
      </div>


    </section>
  )
}

export default ListadoMenus