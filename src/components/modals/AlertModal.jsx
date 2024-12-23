import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";

const AlertModal = ({ setAlertModal }) => {

    return (
        <div className='fixed  bg-black/80 z-40 h-full w-full flex items-center justify-center'>
            <div className='max-w-[40rem] border-2 shadow-md fixed mx-2  bg-white p-6 text-lg leading-6'>
                <button onClick={() => setAlertModal(false)} className=' text-2xl absolute top-2 right-2'><IoMdClose /></button>
                <h2 className='text-center text-2xl text-red-600 mb-4'>¡Atención leer!</h2>
                <p className='mb-4'>*Esta es una pagina de muestra, que aún se encuentra en desarrollo, por este motivo algunas funcionalidades pueden no estar disponibles o no funcionar de manera correcta.</p>
                <p>*Al estar alojada en un servidor gratuito, la primera carga de los productos puede demorar algunos minutos, por favor se paciente. </p>
                <p className='mt-6'>Cualquier consulta puedes enviarla a <Link className='hover:underline text-blue-900' to="mailto:nassahel.elias@gmail.com">nassahel.elias@gmail.com</Link></p>
                <p>Muchas gracias!</p>
            </div>

        </div>
    )
}

export default AlertModal