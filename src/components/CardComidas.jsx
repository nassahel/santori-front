import { Link } from "react-router-dom";
import stars from "/assets/img/stars.gif"

export const CardComidas = ({ product, action }) => {

  return (
    <Link to="" onClick={action} className=" md:mx-auto lg:mx-0 w-full md:w-1/2 2xl:w-1/3 p-2 ">
      <div className="flex items-center bg-white duration-300 p-2 rounded group relative  h-40 hover:shadow-md border ">
        <div className="flex h-full w-full  duration-300">
          <div className=" w-7/12 h-full flex flex-col justify-between">
            <div className="flex flex-col justify-between">
              <h5 className='font-semibold text-lg'>{product.name}</h5>
              <p className="text-sm">{product.description}</p>
            </div>
            {!product.isOffer && <p className='font-bold text-xl'>${product.price}</p>}
          </div>
          <figure className="w-5/12 h-full overflow-hidden rounded mx-1">
            <img className=' w-full h-full object-cover' src={product.productImage} alt={product.name} />
          </figure>
        </div>
        {
          product.isOffer &&
          <div className="absolute w-[7rem]  py-1 bottom-1 left-1 bg-yellow-300 flex flex-col items-center justify-center">
            <div className="text-xs flex items-center gap-2">
              <p className="font-semibold">Oferta!</p>
              <p className="line-through">${product.price}</p>
            </div>
            <p className="text-xl font-semibold">${product.offerPrice}</p>
          </div>
        }
      </div>
    </Link>
  )
}