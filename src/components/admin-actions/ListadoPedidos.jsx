import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const ListadoPedidos = () => {
  const [pedidos, setPedidos] = useState(null)

  let token = localStorage.getItem('token');

  useEffect(() => {

    const getPedidos = async () => {
      const response = await fetch('https://santori-back.onrender.com/api/pedidos', {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "x-token": token,
        }
      })
      const data = await response.json()
      setPedidos(data.orders)
  console.log(data);

    }
    getPedidos()
  }, [])


  const claseUlt = 'border h-full flex items-center justify-center w-1/3'



  return (
    <>
    {
      pedidos ?
        <section className='flex flex-col gap-2'>
          {
            pedidos.map((pedido, i) => (
              <article key={i} className='bg-white flex rounded-sm'>
                <div className='h-28 w-28 overflow-hidden'>
               
                </div>
                <div className='flex grow justify-evenly items-center'>
                  <div className='flex h-full w-3/4'>
                    <p className=' text-center border h-full flex items-center justify-center w-1/3'></p>
                    <p className=' text-center border h-full flex items-center justify-center w-2/3'></p>
                  </div>
                  <div className='flex h-full w-1/4'>
                    <p className={claseUlt}></p>
                    <p className={claseUlt}></p>
                    <p className={claseUlt}></p>
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

export default ListadoPedidos