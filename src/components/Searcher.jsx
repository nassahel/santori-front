import React, { useContext, useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import { AppContext } from '../context/ContextProvider';

const Searcher = ({ type }) => {
  const { setSearch } = useContext(AppContext);
  

  return (
    <>
      {type === '1' ? (
        <div className='bg-white max-w-[60rem] mx-auto rounded hidden lg:flex text-black justify-between overflow-hidden px-5 items-center'>
          <input  onChange={(e) => setSearch(e.target.value)} type="search" name="" id="" placeholder='Buscar comidas...' className='hover:outline-none w-full mr-6 h-12 py-1 focus:outline-none ' />
        </div>
      ) :
        (
          <div className='mt-14 p-2 lg:hidden'>
              <input onChange={(e) => setSearch(e.target.value)} type="search" name="" id="" placeholder='Buscar comidas...' className='hover:outline-none rounded-md bg-white px-3 w-full  h-10 py-1 focus:outline-none ' />   
          </div>
        )}
    </>
  )
}

export default Searcher