import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";



const ListadoMenus = () => {
  const [menus, setMenus] = useState(null)

  useEffect(() => {

    const getMenus = async () => {
      const response = await fetch('https://santori-back.onrender.com/api/menu')
      const data = await response.json()
      setMenus(data.menues)
    }
    getMenus()
  }, [])

  console.log(menus);

  const claseUlt = 'border h-full flex items-center justify-center w-1/3'
  return (
    <>
      {
        menus ?
          <section className='flex flex-col gap-2'>
            {
              menus.map((menu, i) => (
                <article key={i} className='bg-white flex rounded-sm'>
                  <div className='h-28 w-28 overflow-hidden'>
                  <img src={menu.image} alt={menu.name} className='h-full object-cover' />

                  </div>
                  <div className='flex grow justify-evenly items-center'>
                    <div className='flex h-full w-3/4'>
                      <p className=' text-center border h-full flex items-center justify-center w-1/3'>{menu.name}</p>
                      <p className=' text-center border h-full flex items-center justify-center w-2/3'>{menu.detail}</p>
                    </div>
                    <div className='flex h-full w-1/4'>
                      <p className={claseUlt}>{menu.category}</p>
                      <p className={claseUlt}>{menu.active === true ? 'Si' : 'No'}</p>
                      <p className={claseUlt}>${menu.price}</p>
                    </div>
                    <div className='w-20 flex flex-col text-2xl items-center justify-around gap-4'>
                    <FaEdit className='cursor-pointer'  />
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

    </>
  )
}

export default ListadoMenus