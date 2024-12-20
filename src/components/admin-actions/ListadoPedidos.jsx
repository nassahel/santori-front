import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { format } from 'date-fns';

const ListadoPedidos = ({ setBtnActive }) => {
  const [pedidos, setPedidos] = useState(null)
  const [detail, setDetail] = useState(null)

  let token = localStorage.getItem('token');


  const deleteOrder = async (idPedido) => {
    Swal.fire({
      title: "Realmente deseas borrar el pedido?",
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = `${import.meta.env.VITE_URL}orders/`
          const response = await fetch(url + idPedido, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-type': 'application/json'
            }
          })

          if (response.ok) {
            setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido._id !== idPedido));
          }
        } catch (error) {
          console.log('No se pudo eliminar el pedido', error);
        }
        Swal.fire("Pedido eliminado", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se pudo eliminar el pedido", "", "alert");
      }
    });
  }


  const orderSwitch = async (idPedido) => {
    try {
      const url = `${import.meta.env.VITE_URL}orders/`
      const response = await fetch(url + idPedido, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        }
      })

      getPedidos()
    } catch (error) {
      console.log('No se pudo eliminar el pedido', error);
    }
  }

  console.log(pedidos);


  const getPedidos = async () => {
    try {
      const url = `${import.meta.env.VITE_URL}orders`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        },
      })
      const data = await response.json()
      setPedidos(data)
    } catch (error) {
      console.log('No se pudo obtener los pedidos', error);
    }
  }


  useEffect(() => {
    setBtnActive('Pedidos')

    getPedidos()
  }, [])



  const expandOrder = (i) => {
    detail === null ? setDetail(i) : setDetail(null)
  }

  return (
    <section>
      <div className='flex justify-end'>
        <button className='bg-white py-2 px-4 my-2 rounded-md border-2 sticky top-10 border-neutral-400 hover:border-black duration-200'>Agregar Pedido</button>
      </div>
      <div>
        {
          pedidos ?
            <section className='flex flex-col gap-2'>
              {
                pedidos.map((pedido, i) => (
                  <article key={i} className=''>
                    <div className=' flex rounded-sm py-1 border-b-2 bg-white'>
                      <button onClick={() => expandOrder(i)} className='px-2 border-e'>
                        {detail === i ? <IoIosArrowUp /> : <IoIosArrowDown />}

                      </button>
                      <p className='px-3 border-r-2 w-[15rem] text-center'>{pedido.clientId}</p>
                      <p className='px-3 border-r-2 w-[17rem] text-center'> <span className='text-neutral-600 italic me-2 text-sm'>Fecha:</span>  {format(pedido.createdAt, 'dd/MM/yyyy HH:mm:ss')}</p>
                      <p className='px-3 border-r-2 w-[10rem] text-center'> <span className='text-neutral-600 italic me-2 text-sm'>Total:</span>  ${pedido.total}</p>

                      <div className=' flex items-center border-l-2 px-3 justify-around ms-auto gap-4'>
                        <button onClick={() => orderSwitch(pedido._id)} title={pedido.isActive ? 'Marcar como realizado' : 'Marcar como pendiente'}> <p className={`px-2 w-28 ${pedido.isActive ? 'bg-red-400' : 'bg-green-400'}   `}>{pedido.isActive ? 'Pendiente🕐' : 'Realizada✔️'}</p></button>
                        <button className='text-xl' onClick={() => deleteOrder(pedido._id)}><RiDeleteBin6Line color='red' /></button>
                      </div>
                    </div>
                    <div className=''>
                      {detail === i &&
                        pedido.productos.map((item, i) => (
                          <div key={i} className='flex border-b  py-2 ms-8 bg-white'>
                            <p className='border-e px-3 w-[20rem]' >{item.name}</p>
                            <p className='border-e px-3 w-[3rem] text-center'>{item.quantity}</p>
                            <p className='border-e px-3 italic text-sm flex items-center'>{item.comentario === '' ? '-' : item.comentario}</p>
                          </div>
                        ))
                      }
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

export default ListadoPedidos