import React from 'react'
import sadEgg from '/assets/img/sadd-egg2.png';
import { Link } from 'react-router-dom';


const styles = {
  minHeight: '77vh'
};

const NotFound = () => {
  return (
    <div className='d-flex justify-content-center align-items-center bg-neutral-100' style={styles}>
      <div className='text-center'>
        <img className='img-fluid w-50 mb-3' src={sadEgg} alt="" />
        <p className='display-2 fw-bold'>ERROR 404</p>
        <h3>Página no encontrada</h3>
        <p>La pagina que estas buscando no existe o hubo otro error.</p>
        <p> <Link className='fw-bold text-light text-decoration-none' to="/">Regresa</Link> o dirigete a <Link className=' text-orange-500 ' to="https://santornini-final53i.netlify.app/">santornini-final53i.netlify.app</Link> para elegir una nueva dirección.</p>
        <Link to="/" className='btn btn-light mt-2 mb-3'> Volver al inicio</Link>
      </div>
    </div>
  );
};

export default NotFound