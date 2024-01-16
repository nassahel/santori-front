import React from 'react'
import "./footer.css"
import { Link } from 'react-router-dom'
import ws from '../../assets/img/logo-ws.png'
import ig from '../../assets/img/logo-ig.png'
import fb from '../../assets/img/logo-fb.png'

function Footer() {
  return (
    <div className="container-fluid footer d-flex justify-content-between text-center py-4 px-3" >
      <div className="col-4 text-start">
        <div className="social-media mb-2 ">
          <Link to='notFound' className='text-decoration-none'><img width="30" src={fb} alt="" /> </Link>
          <Link to='notFound' className='text-decoration-none'><img width="30" src={ig} alt="" /> </Link>
          <Link to='notFound' className='text-decoration-none'><img width="30" src={ws} alt="" /> </Link>
        </div>
        <div className="tel mb-1">Tel: 12345678</div>
        <div className="direction mb-1">Av. Nombre nombre 123</div>
      </div>
      <div className="col-4">
        <Link to='/' className="text-decoration-none">
          <div className="res-name">Santorini Restaurant</div>
        </Link>
        <div className="derechos">© Todos los derechos reservados</div>
      </div>
      <div className="col-4 text-end">
        <Link to='notFound' className="text-decoration-none text-light"><div className="contactUs">Contáctanos</div></Link>
        <Link to='about' className="text-decoration-none text-light"><div className="aboutUs">Acerca de nosotros </div></Link>
        <Link to='notFound' className="text-decoration-none text-light"><div className="work">Trabaja con nosotros</div></Link>
      </div>
    </div>
  )
}

export default Footer