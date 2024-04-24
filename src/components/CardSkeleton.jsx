import React from 'react'

const CardSkeleton = ({ cantidad= 6 }) => {

  const tarjetas = Array.from({ length: cantidad }, (_, index) => (
    <section key={index} className='md:mx-auto lg:mx-0 w-full md:w-1/2 2xl:w-1/3 p-2'>
      <div className="flex items-center bg-white duration-300 p-2 rounded group relative border-b overflow-hidden border-r h-40 hover:border-yellow-600">
        <div className="flex h-full w-full duration-300">
          <div className="w-4/6 h-full flex flex-col justify-between">
            <div className="flex flex-col justify-between">
              <h5 className='font-semibold text-lg h-4 w-60 bg-neutral-300 mb-2 animate-pulse rounded'></h5>
              <p className="text-sm h-2 w-60 bg-neutral-300 mb-2 animate-pulse rounded"></p>
              <p className="text-sm h-2 w-60 bg-neutral-300 mb-2 animate-pulse rounded"></p>
              <p className="text-sm h-2 w-60 bg-neutral-300 mb-2 animate-pulse rounded"></p>
            </div>
            <p className='font-bold text-lg h-6 w-14 bg-neutral-300 rounded'></p>
          </div>
          <figure className="w-2/6 h-full overflow-hidden rounded mx-1">
            <div className='w-40 h-40 bg-neutral-300 animate-pulse'></div>
          </figure>
        </div>
      </div>
    </section>
  ))


  return (
    <article className='flex flex-wrap xl:w-3/4 mx-auto mt-10'>
      {tarjetas}
    </article>

  )
}

export default CardSkeleton