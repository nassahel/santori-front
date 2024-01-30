import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

function Login() {
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
		<div className='mx-auto my-auto col-10 col-xl-3 bg-dark bg-opacity-75 rounded border border-success col-sm-6 col-md-6 col-lg-5'>
			<div className='form-container col-lg-8 col-xl-10 mx-auto my-auto px-3 text-white'>
				<Form id="miFormulario" onSubmit={botonIniciar}>
					<div>
						<h3 className=' mt-2 text-center'>Inicio de sesión</h3>
					</div>
					<div>
						<Form.Label className='correo' >Correo:</Form.Label>
						<Form.Control
							required
							maxLength='50'
							type='email'
							aria-describedby='email'
							placeholder='Ingrese su email'
							onChange={(e) => setCorreo(e.target.value)}
						/>
					</div>
					<div className='mt-1'>
						<Form.Label className='contraseña'>Contraseña:</Form.Label>
						<Form.Control
							required
							maxLength='20'
							type="password"
							aria-describedby='password'
							placeholder='Ingrese su contraseña'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='mb-3 d-flex justify-content-center'>
						<Button className='mt-3' type='submit' variant="success">Iniciar Sesión</Button>
					</div>
				</Form>
				<div className='mb-2 text-center'>
					<Link className='text-decoration-none fw-normal fs-6 text-light' to="/register">¿No tenés cuenta? <span className='fw-bold text-decoration-underline'>Registrate</span></Link>
				</div>
			</div>
			{error && <p className='mt-3 fw-semibold text-danger mb-0'>Todos los campos son obligatorios.</p>}
		</div>
	)
}

export default Login;






