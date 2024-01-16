import React, { useState, useEffect } from "react";
import PedidosResultado from "./pedidosResultado";
import Swal from 'sweetalert2'


const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [status, setStatus] = useState("");
  const [idPedidos, setidPedidos] = useState();

  let token = localStorage.getItem('token');

  const pedidosGet = async () => {

    try {
      const url = 'https://backend-rolling53i.onrender.com/api/pedidos';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-token': token,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error('No se pudo agregar el pedido');
      }
      setPedidos(data.orders)
    } catch (error) {
      console.error('Error al agregar el pedido:', error);
    }
  }


  useEffect(() => {
    pedidosGet();
  }, []);

  //EDITAR PRODUCTOS DEL BACKEND
  const datosEdicion = (id) => {
    const pedidoFind = pedidos.find((pedido) => pedido._id === id);

    if (pedidoFind) {
      setidPedidos(pedidoFind)
      setStatus(pedidoFind.status)
    }
  }

  const modificarPedidos = async () => {
    try {
      const updatePedidos = {
        status: status,
      };


      const url = `https://backend-rolling53i.onrender.com/api/pedidos/${idPedidos._id}`; // Incluir el ID en la URL
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-token': token,
        },
        body: JSON.stringify(updatePedidos),
      });
      if (!response.ok) {
        throw new Error('No se pudo editar el Pedido');
      }
      Swal.fire({
        icon: 'success',
        title: 'Genial!',
        text: 'Producto eliminado con éxito',
        confirmButtonColor: "#2c4b45"
      })
      pedidosGet();
    } catch (error) {
      console.error('Error al editar el pedido:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status === 'pendiente' || status === 'realizado') {
      modificarPedidos();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Estado de pedido no válido',
        confirmButtonColor: "#2c4b45"
      })
    }

  };

  return (
    <main className="container-fluid col-lg-11">
      <form className="m-auto  bg-white p-2 rounded" onSubmit={handleSubmit}>
        <div className="row mt-4">
          <div className=' d-flex justify-content-center flex-column align-items-center text-center'>
            <label className='ps-2 producto-texto fs-6' htmlFor="descripcion">Pedido Status</label>
            <select
              className='mt-3 input-productos col-6 col-lg-2 p-1 input-nombre rounded border border-black border-opacity-50'
              name="status"
              id="status"
              placeholder="Producto status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={"seleccionar"}>Seleccione Opción</option>
              <option value={"pendiente"}>Pendiente</option>
              <option value={"realizado"}>Realizado</option>
            </select>
          </div >
          <div className='col-md-12'>
            <div className='mt-2 text-center'>
              <input
                className="my-2 mb-3 btn btn-dark"
                type="submit"
                value={'Editar Pedido'}
              />
            </div>
          </div>
        </div>
      </form>

      <div className="resultado">
        <PedidosResultado
          pedidos={pedidos}
          modificarPedidos={datosEdicion}
        />
      </div>
    </main>
  );
}

export default Pedidos;
