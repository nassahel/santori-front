import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa6";


const Orders = () => {
  const [orden, setOrden] = useState();
  const [envio, setEnvio] = useState(0)
  const [modal, setModal] = useState(false);



  const setearOrden = async () => {
    const pedido = await JSON.parse(localStorage.getItem('pedido'))
    setOrden(pedido);
  }

  useEffect(() => {

    setearOrden()
  }, [])


  const deleteItem = async (id) => {
    let pedido = await JSON.parse(localStorage.getItem('pedido'))
    let deletedItem = pedido.productos.filter(prod => prod._id !== id)
    pedido.productos = deletedItem
    console.log(pedido);
    localStorage.setItem('pedido', JSON.stringify(pedido))
    setearOrden()
  }

  // console.log(orden);

  return (
    <div className='w-full max-w-[80rem] mx-auto lg:flex py-6 '>
      <div className='w-full xl:w-3/4 p-2'>
        <div className='flex flex-col gap-3' >
          {
            orden ? (orden.productos.map((prod, i) => (
              <div key={i} className='bg-white border h-[8rem] flex rounded-md p-4' >
                <div className='w-2/12 overflow-hidden'>
                  <img src={prod.image} alt="" className='h-full w-full object-cover rounded-sm' />
                </div>
                <div className='w-9/12 ml-6 flex flex-col justify-between'>
                  <div className='flex w-full justify-between'>
                    <p className='font-semibold'>{prod.name} </p>
                    <p className='text-xl'>${prod.totalProducto}</p>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex items-center justify-between w-20 bg-blue-500 text-white px-2 rounded-full'>
                      <FaMinus className='cursor-pointer' />
                      <p>{prod.quantity}</p>
                      <FaPlus className='cursor-pointer' />
                    </div>
                    <button onClick={() => deleteItem(prod._id)} className='font-semibold hover:underline'>Eliminar</button>
                  </div>
                </div>
              </div>
            )))
              :
              (<p>Cargando...</p>)
          }

        </div>
      </div>

      <div className='lg:w-1/4 p-2 sticky bottom-0'>
        <div className='bg-white border rounded-md p-2 lg:p-4 flex flex-col gap-2 lg:gap-4'>
          <div className='border-b pb-2 '>
            <h2 className='text-center text-lg font-semibold '>Resumen de compra</h2>
          </div>
          <div className='flex flex-col lg:gap-1'>
            <div className='flex justify-between'>
              <p>Productos</p>
              <p>${orden && orden.total}</p>
            </div>
            <div className='flex justify-between'>
              <p>Envio</p>
              <p className='text-blue-500 font-semibold'>{envio === 0 ? 'Gratis' : envio}</p>
            </div>
            <Link className='flex justify-between'>
              <p className='text-blue-500 font-semibold'>Cupón de descuento</p>
              <p>-</p>
            </Link>
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex justify-between text-lg font-semibold'>
              <p className=''>Total</p>
              <p>${orden && orden.total}</p>
            </div>
            <div>
              <button onClick={()=> alert("Ups! 😥 Página en desarrollo. \nEsta funcion estara disponible proximamente!")} className='bg-blue-500 w-full py-1 text-white font-semibold rounded-full hover:bg-blue-600 duration-300'>Confirmar compra</button>
            </div>
          </div>

        </div>
      </div>

    </div>


  )
}

export default Orders