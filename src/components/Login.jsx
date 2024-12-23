import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Loadinggif from '/assets/img/loading.gif'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [eyePass, setEyePass] = useState(false);
  const [loading, setLoading] = useState(false)



  const TryLogin = async () => {
    if (email === "" || password === "") {
      setError(true);
      return;
    } else {
      setError(false);
      try {
        setLoading(true)
        const url = `${import.meta.env.VITE_URL}login`
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
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
          setLoading(false)
        } else {
          const data = await response.json();
          // console.log(data);

          const token = data.token;
          localStorage.setItem('token', token);
          setEmail("");
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
        <div id="miFormulario" className='bg-white rounded-md shadow-sm py-12 mb-2 px-4 flex flex-col gap-4 '>
          <div className=''>
            <h3 className='text-center font-semibold text-xl'>Inicio de sesión</h3>
          </div>
          <div className='flex flex-col border-b  '>
            <label className='font-semibold mb-1' >Correo:</label>
            <input required maxLength='50' type='email' className='focus:outline-none text-neutral-600' aria-describedby='email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='flex flex-col border-b'>
            <label className='font-semibold mb-1' >Contraseña:</label>
            <div className='flex justify-between'>
              <input className='focus:outline-none text-neutral-600 w-full' required maxLength='20' type={eyePass ? 'text' : 'password'} aria-describedby="passwordHelpBlock" onChange={(e) => setPassword(e.target.value)} />
              {!eyePass ? <IoEyeOffOutline onClick={() => setEyePass(true)} size="20" /> : <IoEyeOutline size="20" onClick={() => setEyePass(false)} />}
            </div>
          </div>
          <div className='mt-8 flex justify-center'>
            <button onClick={TryLogin} className='bg-orange-400 text-white py-1 w-[9rem] h-8 flex items-center justify-center rounded-full' >{loading ? <img src={Loadinggif} alt="load" className='w-5' /> : 'Iniciar Sesión'}</button>
          </div>
        </div>
        <div className='text-center'>
          <Link className='' to="../register">¿No tenés cuenta? <span className='underline font-semibold'>Registrate</span></Link>
        </div>
      </div>
      {error && <p className=''>Todos los campos son obligatorios.</p>}
    </div>
  )
}
export default Login