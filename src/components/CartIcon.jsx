import React, { useEffect, useState } from 'react'
import { TiShoppingCart } from "react-icons/ti";
import { Link } from 'react-router-dom';


const CartIcon = ({ numPedidos }) => {
  const [contador, setContador] = useState(0)


  useEffect(() => {
    const pedid = JSON.parse(localStorage.getItem('pedido'))

    pedid && setContador(pedid.productos.length)
  }, [numPedidos])

  return (
    <div className='border-l text-white border-l-neutral-300 px-2 flex items-center justify-center h-8 hover:bg-orange-400 duration-200 relative duration-300'>
     {
      contador !== 0 && <span className='absolute top-0 text-xs bg-blue-600 rounded-full w-4 h-4 flex items-center justify-center right-0'>{contador}</span>
     }
      
      <Link to="/orders" className=''><TiShoppingCart size='25' /></Link>

    </div>
  )
}

export default CartIcon