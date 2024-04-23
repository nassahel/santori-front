import React from 'react'
import { TiShoppingCart } from "react-icons/ti";
import { Link } from 'react-router-dom';


const CartIcon = () => {
  return (
    <Link to="/orders" className='border-l text-white border-l-neutral-300 pl-2 py-1 duration-300'><TiShoppingCart size='25' /></Link>
  )
}

export default CartIcon