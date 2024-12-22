import React from 'react'
import { Link } from 'react-router-dom'


const Banner = ({ image, link="" }) => {
  return (
    <figure className=' lg:w-full flex justify-center hover:shadow-md duration-200 gap-4 items-center overflow-hidden rounded-md my-4 mx-auto'>
      <Link className='w-full' to={link} target='_blank'>
        <img src={image} alt="" className=' rounded-md w-full' />
      </Link>

    </figure>
  )
}

export default Banner