import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [direc, setDirec] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [rol, setRol] = useState("USER_NORMAL");
  const [eyePass, setEyePass] = useState(false);
  const [eyeConf, setEyeConf] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (nombre === "" || correo === "" || direc === "" || password === "" || confirmPassword === "") {
      setError(true);
      return;
    } else if (password !== confirmPassword) {
      setError(true);
      return;
    }
    setError(false);

    try {
      const response = await fetch('https://santori-back.onrender.com/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, correo, direc, password, rol, estado: true }),
      });

      if (!response.ok) {
        console.error('Error en el registro:', response.statusText);
        Swal.fire({
          title: 'No se pudo registrar la cuenta. Intenta de nuevo en unos segundos.',
          icon: 'warning',
          iconHtml: '!',
          confirmButtonText: 'Ok',
          confirmButtonColor: "#2c4b45",
          showCloseButton: true
        })
      }

      limpiarFormulario();
      window.location.href = ('/login');

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const limpiarFormulario = () => {
    setNombre("");
    setCorreo("");
    setDirec("");
    setPassword("");
    setConfirmPassword("");
    document.getElementById("miFormulario").reset();
  };

  return (
    <div className='w-full lg:w-1/2 flex flex-col items-center justify-center'>
      <div className=' w-10/12 max-w-[26rem]'>
        <form id="miFormulario" onSubmit={handleRegister} className='bg-white rounded-md shadow-sm py-8 mb-2 px-4 flex flex-col gap-4 '>
          <div className=''>
            <h3 className='text-center font-semibold text-xl'>Registra tu cuenta</h3>
          </div>
          <div className='flex flex-col border-b  '>
            <label className='font-semibold mb-1' >Nombre y apellido:</label>
            <input className='focus:outline-none text-neutral-600' required aria-describedby="name" maxLength='50' type="text" onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className='flex flex-col border-b'>
            <label className='font-semibold mb-1' >Correo:</label>
            <input className='focus:outline-none text-neutral-600' required type="email" maxLength='50' aria-describedby="correo" onChange={(e) => setCorreo(e.target.value)} />
          </div>
          <div className='flex flex-col border-b'>
            <label className='font-semibold mb-1' >Dirección:</label>
            <input className='focus:outline-none text-neutral-600' required type="text" maxLength='50' aria-describedby="direc" onChange={(e) => setDirec(e.target.value)} />
          </div>
          <div className='flex flex-col border-b'>
            <label className='font-semibold mb-1' >Contraseña:</label>
            <div className='flex justify-between'>
              <input className='focus:outline-none text-neutral-600 w-full' required maxLength='20' type={eyePass ? 'text' : 'password'} aria-describedby="passwordHelpBlock" onChange={(e) => setPassword(e.target.value)} />
              {!eyePass ? <IoEyeOffOutline onClick={()=> setEyePass(true)} size="20" /> : <IoEyeOutline size="20" onClick={()=> setEyePass(false)} />}
            </div>
          </div>
          <div>
            <div className='flex flex-col border-b'>
              <label className='font-semibold mb-1' >Confirmar contraseña:</label>
              <div className='flex justify-between'>
              <input className='focus:outline-none text-neutral-600' required maxLength='20' type={eyeConf ? 'text' : 'password'} aria-describedby="confirmPasswordHelpBlock" onChange={(e) => setConfirmPassword(e.target.value)} />
              {!eyeConf ? <IoEyeOffOutline onClick={()=> setEyeConf(true)} size="20" /> : <IoEyeOutline size="20" onClick={()=> setEyeConf(false)} />}
            </div>
            </div>
            <p className='text-info' id="confirmPasswordHelpBlock">*Por favor, repita la misma contraseña.</p>
          </div>

          <div className='flex justify-center'>
            <input required name="terminos-condiciones" type={'checkbox'} />
            <p className='ms-2'>Acepto los <Link to="#" className='underline hover:text-neutral-400'>Terminos y condiciones</Link> </p>
          </div>

          <div className=' d-flex justify-content-center'>
            <button type='submit' className='bg-orange-400 text-white py-1 px-4 rounded-full' >Registrarse</button>
          </div>
        </form>
        <div className='text-center'>
          <Link className='text-decoration-none fw-normal fs-6' to="../login">¿Ya tenés cuenta? <span className='font-semibold underline'>Inicia Sesion</span></Link>
        </div>
      </div>
      {error && <p className=''>Todos los campos son obligatorios.</p>}
    </div>
  )
}

export default Register