import React from 'react'
import { AiOutlineClose } from "react-icons/ai";


const BuyModal = ({modalAction}) => {
  return (
    <section onClick={modalAction} className='fixed z-40 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/50'>
      
      <article className=' bg-white h-4/6 w-3/12 rounded-xl shadow py-3 z-50'>
        <div className='flex text-xl font-semibold'>
          <h2 className='w-11/12 text-center '>Pizza Margarita</h2>
          <AiOutlineClose onClick={modalAction}  className='w-1/12 cursor-pointer'/>
        </div>
        <img src="" alt="" />
      </article>

    </section>
  )
}

export default BuyModal