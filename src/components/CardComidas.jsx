import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import stars from "/assets/img/stars.gif"

export const CardComidas = ({ product, action }) => {

  return (
    <Link to="" onClick={action} className=" md:mx-auto lg:mx-0 w-full md:w-1/2 2xl:w-1/3 p-2">
      <div className="flex items-center bg-white duration-300 p-2 rounded group relative border-b overflow-hidden border-r h-40 hover:border-yellow-600">
        <div className="flex h-full w-full  duration-300">
          <div className=" w-4/6 h-full flex flex-col justify-between">
            <div className="flex flex-col justify-between">
              <h5 className='font-semibold text-lg'>{product.name}</h5>
              <p className="text-sm">{product.detail}</p>
            </div>
            <p className='font-bold text-xl'>${product.price}</p>
          </div>
          <figure className="w-2/6 h-full overflow-hidden rounded mx-1">
            <img className=' w-full h-full object-cover' src={product.image} alt={product.name} />
          </figure>
        </div>
      </div>


    </Link>
  )
}