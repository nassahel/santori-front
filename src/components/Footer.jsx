import React from 'react'
import { Link } from 'react-router-dom'
import { BsInstagram,  BsWhatsapp  } from "react-icons/bs";
import { LiaFacebook } from "react-icons/lia";

function Footer() {
  return (
    <div className="bg-orange-500 flex flex-col lg:flex-row px-4 py-4 gap-4 min-h-[15vh] text-white items-end justify-between text-sm mt-auto" >
      <div className="lg:w-1/3 flex flex-col w-full items-center lg:items-start">
        <div className="flex items-center gap-2">
          <Link to='notFound' className=''><BsWhatsapp size="25" /> </Link>
          <Link to='notFound' className=''><BsInstagram size="25" /> </Link>
          <Link to='notFound' className=''><LiaFacebook size="33" /> </Link>
        </div>
        <div className="">Tel: 12345678</div>
        <div className="direction">Av. Nombre nombre 123</div>
      </div>
      <div className="text-center lg:w-1/3 w-full  ">
        <Link to='/' className=""> 
          <div className="text-lg">Santori Delivery</div>
        </Link>
        <div className="">© Todos los derechos reservados</div>
        <div className='flex gap-1 justify-center'>
          <Link className='hover:text-neutral-200'>Declaracion de Privacidad</Link>
          <p>|</p>
          <Link className='hover:text-neutral-200'>Politica de Seguridad</Link>
        </div>
      </div>
      <div className=" text-center lg:text-right lg:w-1/3 w-full  ">
        <Link to='notFound' className=""><div className="">Contáctanos</div></Link>
        <Link to='about' className=""><div className="">Acerca de nosotros </div></Link>
        <Link to='notFound' className=""><div className="">Trabaja con nosotros</div></Link>
      </div>
    </div>
  )
}

export default Footer