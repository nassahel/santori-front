import React from 'react'


const Banner = ({image1, image2}) => {
  return (
    <figure className='w-3/4 flex justify-center h-[20rem] gap-4 items-center overflow-hidden rounded-md my-4 mx-auto'>
        <img src={image1} alt="" className='h-full w-full rounded-md object-cover object-left' />
        {image2 && <img src={image2} alt="" className='h-full w-full rounded-md' />}
    </figure>
  )
}

export default Banner