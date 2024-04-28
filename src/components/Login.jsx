import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const botonIniciar = async (e) => {
    e.preventDefault();

    if (correo === "" || password === "") {
      setError(true);
      return;
    } else {
      setError(false);

      try {
        const response = await fetch('https://santori-back.onrender.com/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo, password }),
        });

        if (!response.ok) {
          console.error('Error al iniciar sesión:', response.statusText);
          Swal.fire({
            title: 'El correo y/o la contraseña son incorrectos',
            icon: 'warning',
            iconHtml: '!',
            confirmButtonText: 'Ok',
            confirmButtonColor: "#2c4b45",
            showCloseButton: true
          })
        } else {
          const data = await response.json();
          const token = data.token;
          localStorage.setItem('token', token);
          setCorreo("");
          setPassword("");
          window.location.href = ('/');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
      }
    }
  }

  return (
    <div className='w-full lg:w-1/2 flex flex-col items-center justify-center'>
      <div className=' w-10/12 max-w-[26rem]'>
        <form id="miFormulario" onSubmit={botonIniciar} className='bg-white rounded-md shadow-sm py-12 mb-2 px-4 flex flex-col gap-4 '>
          <div className=''>
            <h3 className='text-center font-semibold text-xl'>Inicio de sesión</h3>
          </div>
          <div className='flex flex-col border-b  '>
            <label className='font-semibold mb-1' >Correo:</label>
            <input required maxLength='50' type='email' className='focus:outline-none text-neutral-600' aria-describedby='email'  onChange={(e) => setCorreo(e.target.value)} />
          </div>
          <div className='flex flex-col border-b'>
            <label className='font-semibold mb-1'>Contraseña:</label>
            <input required maxLength='20' type="password" aria-describedby='password' className='focus:outline-none text-neutral-600' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='text-center mt-4'>
            <button onClick={()=> alert("Ups! 😥 Página en desarrollo. \nEsta funcion estara disponible proximamente!")} className='bg-orange-400 text-white py-1 px-4 rounded-full' type='submit' >Iniciar Sesión</button>
          </div>
        </form>
        <div className='text-center'>
          <Link className='' to="../register">¿No tenés cuenta? <span className='underline font-semibold'>Registrate</span></Link>
        </div>
      </div>
      {error && <p className=''>Todos los campos son obligatorios.</p>}
    </div>
  )
}
export default Login