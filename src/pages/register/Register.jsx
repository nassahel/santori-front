import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

function Register() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [direc, setDirec] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [rol, setRol] = useState("USER_NORMAL");

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
      const response = await fetch('https://backend-rolling53i.onrender.com/api/usuarios', {
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
    <div className='col-11 col-lg-6 col-xl-4 col-md-7 p-3 m-auto my-4 bg-dark bg-opacity-75 rounded border border-success'>
      <div className=' mx-auto py-2 col-lg-8'>
        <div className='mb-3 justify-content-center'>
          <h3 className='text-white text-center'>Registra tu cuenta</h3>
        </div>
        <Form id='miFormulario' onSubmit={handleRegister}>
          <div>
            <Form.Label className='text-white' >Nombre:</Form.Label>
            <Form.Control
              required
              aria-describedby="name"
              maxLength='50'
              type="text"
              placeholder='Ingrese su nombre'
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className='mt-1'>
            <Form.Label className='text-white' >Correo:</Form.Label>
            <Form.Control
              required
              type="email"
              maxLength='50'
              aria-describedby="correo"
              placeholder='Ingrese su correo'
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className='mt-1'>
            <Form.Label className='text-white'>Direccion:</Form.Label>
            <Form.Control
              required
              type="text"
              maxLength='50'
              aria-describedby="direc"
              placeholder='Ingrese su dirección'
              onChange={(e) => setDirec(e.target.value)}
            />
          </div>
          <div className='mt-1'>
            <Form.Label className='text-white'>Contraseña:</Form.Label>
            <Form.Control
              required
              maxLength='20'
              type="password"
              aria-describedby="passwordHelpBlock"
              placeholder='Ingrese su contraseña'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mt-1'>
            <Form.Label className='text-white'>Repetir Contraseña:</Form.Label>
            <Form.Control
              required
              maxLength='20'
              type="password"
              aria-describedby="confirmPasswordHelpBlock"
              placeholder='Repetir contraseña'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Form.Text className='text-info' id="confirmPasswordHelpBlock">
              *Por favor, repita la misma contraseña.
            </Form.Text>
          </div>
          <div className='d-flex mt-3 text-white '>
            <Form.Check
              required
              name="terminos-condiciones"
              type={'checkbox'}
            />
            <p className='ms-2'>Acepto terminos y condiciones</p>

          </div>
          <div className='mb-3 d-flex justify-content-center'>
            <Button type='submit' variant="success">Registrarse</Button>
          </div>

        </Form>
        <div className='text-center'>
          <Link className='text-decoration-none fw-normal fs-6 text-light' to="/login">¿Ya tenés cuenta? <span className='fw-bold text-white text-decoration-underline'>Inicia Sesion</span></Link>
        </div>

        {
          error && <p className='mt-3 fw-semibold text-danger mb-0'>Todos los campos son obligatorios.</p>
        }
      </div>
    </div>
  )
}

export default Register