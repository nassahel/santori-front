import React from 'react'
import Pedidos from '../../components/admin-actions/pedidos'
import Usuarios from '../../components/admin-actions/usuarios'
import './admin.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Productos from '../../components/admin-actions/productos';


function Admin() {
  return (
    <div className='container-fluid contenedor-completo mt-4'>
      <Tabs  
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3">
        <Tab eventKey="home" title="Productos" >
          <Productos />
        </Tab>
        <Tab eventKey="profile" title="Usuarios">
          <Usuarios />
        </Tab>
        <Tab eventKey="contact" title="Pedidos">
          <Pedidos />
        </Tab>
      </Tabs>
    </div>
  )
}

export default Admin;