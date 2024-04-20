import React from 'react'
import Pedidos from '../components/admin-actions/pedidos'
import Usuarios from '../components/admin-actions/usuarios'
import './admin.css'
import Productos from '../components/admin-actions/productos';


function Admin() {
  return (
    <div className='container-fluid contenedor-completo mt-4'>
      <div  
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3">
        <div eventKey="home" title="Productos" >
          <Productos />
        </div>
        <div eventKey="profile" title="Usuarios">
          <Usuarios />
        </div>
        <div eventKey="contact" title="Pedidos">
          <Pedidos />
        </div>
      </div>
    </div>
  )
}

export default Admin;