import React, { useContext, useEffect, useState } from 'react'
import { TiShoppingCart } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { AppContext } from '../context/ContextProvider';


const CartIcon = () => {
  const [contador, setContador] = useState(0)
  const { numPedidos } = useContext(AppContext)


  useEffect(() => {
    const pedid = JSON.parse(localStorage.getItem('pedido'))
    pedid && setContador(pedid.productos.length)
  }, [numPedidos])

  return (
    <Link to='/orders' className='text-white  px-2 flex items-center justify-center h-8 hover:bg-orange-400 duration-200 relative'>
      {
        contador !== 0 && <span className='absolute top-0 text-xs bg-blue-600 rounded-full w-4 h-4 flex items-center justify-center right-0'>{contador}</span>
      }
      <TiShoppingCart size='25' />
    </Link>
  )
}

export default CartIcon