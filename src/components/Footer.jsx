import React from 'react'
import { Link } from 'react-router-dom'
import { BsInstagram,  BsWhatsapp  } from "react-icons/bs";
import { LiaFacebook } from "react-icons/lia";

function Footer() {
  return (
    <div className="bg-orange-500 flex px-4 py-4 h-[15vh] text-white items-end justify-between text-sm mt-auto" >
      <div className="w-1/3 flex flex-col">
        <div className="flex items-center gap-2">
          <Link to='notFound' className=''><BsWhatsapp size="25" /> </Link>
          <Link to='notFound' className=''><BsInstagram size="25" /> </Link>
          <Link to='notFound' className=''><LiaFacebook size="33" /> </Link>
        </div>
        <div className="">Tel: 12345678</div>
        <div className="direction">Av. Nombre nombre 123</div>
      </div>
      <div className="text-center w-1/3">
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
      <div className="col-4 text-end w-1/3">
        <Link to='notFound' className=""><div className="contactUs">Contáctanos</div></Link>
        <Link to='about' className=""><div className="aboutUs">Acerca de nosotros </div></Link>
        <Link to='notFound' className=""><div className="work">Trabaja con nosotros</div></Link>
      </div>
    </div>
  )
}

export default Footer