import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/ContextProvider';
import { jwtDecode } from 'jwt-decode';
import { formatDate, sortData } from '../utils/utils';
import Swal from 'sweetalert2';

const MisPedidos = () => {
  const { userData } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const { userId } = jwtDecode(token);
      getPedidos(userId);
    } else {
      Swal.fire('usuario no registrado!', '', 'alert');
    }
  }, [token]);

  const getPedidos = async (userId) => {
    const url = `${import.meta.env.VITE_URL}orders/byUser/`
    try {
      // console.log('URL:', url);
      const response = await fetch(url + userId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrders(sortData(data));
    } catch (error) {
      // console.error('Fetch error:', error);
      // Swal.fire('no se pudo obtener los pedidos!', error.message, 'alert');
    }
  };

  return (
    <section>
      <div className='py-10 text-center'>
        <h2 className='text-3xl px-4 '>Hola <span className='text-orange-500 capitalize'>{userData && userData.name}</span>, aquí puedes ver tus pedidos!</h2>
      </div>
      <div className='w-11/12 lg:w-4/12 mx-auto'>
        {
          orders.length === 0 ?
            <div>No tienes órdenes</div>
            :
            orders.map((item, i) => (
              <div key={i} className='border shadow my-4 px-6 py-4 bg-white '>
                <div className='flex justify-between items-center  py-2 border-b border-neutral-600 '>
                  <div className='flex flex-col lg:flex-row lg:gap-2 '>
                    <p><span className='text-neutral-500'>Pedido:</span> {item._id.split('', 5)}</p>
                    <p className='hidden lg:inline'>|</p>
                    <p><span className='text-neutral-500'>Fecha:</span> {formatDate(item.createdAt)}</p>
                  </div>
                  <p className={`${item.isActive ? 'bg-red-300' : 'bg-green-300'} font-light px-3 rounded-full`}>{item.isActive ? 'Pendiente' : 'Entregado'}</p>
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
  );
};

export default MisPedidos;
