import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logoResto from '../../assets/img/hnb.png'
import "./navbar.css";
import { CartContext } from '../cart-context/CartContext';
import Swal from 'sweetalert2'

function Navbarr({ auth, userAdmin }) {

  useEffect(() => {
    userAdmin();
  }, [auth, userAdmin]);

  const [userRole, setUserRole] = useState('USER_NORMAL');
  const [cerrarSesion, setCerrarSesion] = useState(false);


  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {

    const checkeoToken = localStorage.getItem('token');

    if (checkeoToken) {
      const tokenData = JSON.parse(atob(checkeoToken.split('.')[1])); //problema solucionado 
      const tokenUserId = tokenData.uid;


      const apiUrl = 'https://backend-rolling53i.onrender.com/api/usuarios';

      const usuariosGet = async () => {
        try {
          const response = await fetch(apiUrl);

          if (!response.ok) {
            throw new Error(`La solicitud falló con código de estado: ${response.status}`);
          }

          const data = await response.json();


          const usuarioFind = data.usuarios.find(item => item._id === tokenUserId);

          if (usuarioFind) {
            if (usuarioFind.rol === 'USER_ADMIN') {
              setUserRole('USER_ADMIN');
            }
          }

          setCerrarSesion(true);
        } catch (error) {
          console.error('Error:', error.message);
        }
      }

      usuariosGet();
    }
  }, []);


  const handleLogout = () => {
    Swal.fire({
      title: '¿Estas seguro que deseas cerrar sesión?',
      confirmButtonText: 'Si',
      confirmButtonColor: "#2c4b45",
      cancelButtonText: 'No',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    });



  };


  return (
    <Navbar collapseOnSelect key="lg" expand="md" className="classnav sticky-top shadow p-lg-3 fs-5" data-bs-theme="dark">
      <Container fluid>
        <NavLink to="/">
          <img src={logoResto} width="240" className="d-inline-block align-center" alt="React Bootstrap logo" />
        </NavLink>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg classnav" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
          data-bs-theme="dark"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
              Menú
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-4 mb-2">
              <NavLink to="/" className="nav-link text-light">Inicio</NavLink>
              <NavLink to="/about" className="nav-link text-light">Nosotros</NavLink>
              {userRole === 'USER_ADMIN' && (
                <NavLink to="/admin" className="nav-link text-light">Administración</NavLink>
              )}
            </Nav>
            <div className='my-auto d-flex justify-content-between'>
              {cerrarSesion ? (
                <button onClick={handleLogout} className="btn btn-success btn-sm mb-1 me-3">Cerrar Sesión</button>
              ) : <NavLink to="/login" className='me-4' >
                <BsPersonCircle size='2rem' color='white' />
              </NavLink >}
              <NavLink to="/orders" className='text-decoration-none me-2 mb-1'>
                <AiOutlineShoppingCart size='2rem' color='white' />
                <span className="position-absolute translate-middle badge rounded-pill bg-success">
                  {cart && cart.length}
                </span>
              </NavLink>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Navbarr;

