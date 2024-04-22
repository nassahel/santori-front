import React from 'react'
import { Link } from 'react-router-dom'


const Banner = ({ image, link="#" }) => {
  return (
    <figure className='w-11/12 lg:w-3/4 flex justify-center hover:shadow-md duration-200 gap-4 items-center overflow-hidden rounded-md my-4 mx-auto'>
      <Link className='' to={link}>
        <img src={image} alt="" className=' rounded-md' />
      </Link>

    </figure>
  )
}

export default Banner