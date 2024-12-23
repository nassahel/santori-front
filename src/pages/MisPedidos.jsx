import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/ContextProvider'
import { jwtDecode } from 'jwt-decode'
import { formatDate, sortData } from '../utils/utils';


const MisPedidos = () => {
  const { userData } = useContext(AppContext);
  const [orders, setOrders] = useState([])
  const token = localStorage.getItem('token')
  const { userId, rol } = jwtDecode(token)





  const getPedidos = async () => {
    if (!token) return console.error('usario no registrado!')
    const url = `${import.meta.env.VITE_URL}orders/byUser/${userId}`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setOrders(sortData(data))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPedidos()
  }, [])

  console.log(orders);

  return (
    <section>
      <div className='py-10 text-center'>
        <h2 className='text-3xl px-4 '>Hola <span className='text-orange-500 capitalize'>{userData && userData.name}</span>, aquí puedes ver tus pedidos!</h2>
      </div>
      <div className='w-11/12 lg:w-7/12 mx-auto'>
        {
          orders.length === 0 ?
            <div>No tenes ordenes</div>
            :
            orders.map((item, i) => (
              <div key={i} className='border shadow my-4 px-6 py-4 bg-white '>
                <div className='flex justify-between  py-2 border-b border-neutral-600'>
                  <div className='flex gap-2 items-center text-sm'>
                    <p>Nº Pedido: {item._id.split('', 5)}</p>
                    <p>|</p>
                    <p>Fecha: {formatDate(item.createdAt)}</p>
                    <p className={`${item.isActive ? 'bg-red-300' : 'bg-green-300'} font-light px-3 rounded-full`}>{item.isActive ? 'Pendiente' : 'Entregado'}</p>
                  </div>
                  <p className='hidden lg:inline'>Total</p>
                </div>

                {
                  item.productos.map((producto, i) => (
                    <div key={i} className='flex text-sm lg:text-base gap-2 border-t text-neutral-600 justify-between py-2'>
                      <div className='flex gap-2 items-center'>
                        
                        <p><span>x{producto.quantity}</span> {producto.name} <span className='text-sm'> (${producto.isOffer ? producto.offerPrice : producto.price})</span> </p>
                        
                      </div>
                      <p>${producto.quantity * (producto.isOffer ? producto.offerPrice : producto.price)}</p>
                    </div>
                  ))
                }
                <div className='flex items-center justify-between font-semibold border-t text-lg border-neutral-600 pt-2'>
                  <p>Total</p>
                  <p>${item.total}</p>
                </div>
              </div>
            ))
        }
      </div>
      <div>

      </div>

    </section>
  )
}

export default MisPedidos