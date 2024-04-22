import React from 'react'
import { AiOutlineClose } from "react-icons/ai";


const BuyModal = ({ modalAction, item }) => {
  return (
    <section className='fixed z-40 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/50'>
      <article className=' bg-white h-4/6 w-11/12 max-w-[27rem] rounded-md relative shadow py-3 px-4 z-50 flex flex-col items-center'>
        <div className='flex text-xl  font-semibold mb-2'>
          <h2 className='w-11/12 text-center ml-6'>{item.name}</h2>
          <AiOutlineClose onClick={modalAction} className='w-1/12 cursor-pointer mr-2 absolute right-0' />
        </div>
        <img src={item.image} alt={item.name} className='w-10/12 max-h-[13rem] object-cover rounded-md mb-4' />
        <p className='text-lg text-justify'>{item.detail}</p>

        <div className='flex justify-between w-full mt-4 font-semibold text-lg bg-neutral-200 py-2 px-4 rounded-md'>
          <p>Unidades</p>
          <div className='flex gap-2 '>
            <span className=''>+</span>
            <p>4</p>
            <span className=''>-</span>
          </div>
        </div>
      </article>

    </section>
  )
}

export default BuyModal