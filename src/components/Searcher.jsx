import React, { useContext, useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import { AppContext } from '../context/ContextProvider';

const Searcher = ({ type }) => {
  const { setSearch } = useContext(AppContext);

  return (
    <>
      {type === '1' ? (
        <div className='bg-white w-full rounded hidden lg:flex text-black justify-between overflow-hidden pl-3 pr-2 items-center'>
          <input  onChange={(e) => setSearch(e.target.value)} type="search" name="" id="" placeholder='Buscar comidas...' className='hover:outline-none w-full mr-6 h-12 py-1 focus:outline-none ' />
          {/* <BiSearchAlt2 onClick={() => setSearch(input)} color='orange' size="29" className='cursor-pointer' /> */}
        </div>
      ) :
        (
          <div className='mt-14 p-2 lg:hidden'>
            <div className='bg-white mx-auto rounded flex text-black justify-between overflow-hidden pl-3 pr-2 items-center'>
              <input type="search" name="" id="" placeholder='Buscar comidas...' className='hover:outline-none w-full mr-6 h-10 py-1 focus:outline-none ' />
              <BiSearchAlt2 onClick={() => alert("Ups! 😥 Página en desarrollo. \nEsta funcion estara disponible proximamente!")} color='orange' size="29" className='cursor-pointer' />
            </div>
          </div>
        )}
    </>
  )
}

export default Searcher