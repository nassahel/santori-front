import Swal from 'sweetalert2'

const PedidosResultado = ({ pedidos, modificarPedidos }) => {


  const handleEditar = (id) => {
    const respuesta = Swal.fire({
      title: 'Desea editar el pedido',
      icon: 'question',
      iconHtml: '?',
      confirmButtonText: 'Si',
      confirmButtonColor: "#2c4b45",
      cancelButtonText: 'No',
      showCancelButton: true,
      showCloseButton: true
    })
    if (respuesta) {
      modificarPedidos(id)
    }
  }

  return (
    <div className='container-fluid p-3'>
      {pedidos.map((pedido) => (
        <div key={pedido._id} className=" row p-2 my-3 rounded bg-white contenedor-agregados agregados-texto">
          <div className='col my-auto'>
            <div className='row'>
              <p><span className='fw-semibold'>Codigo de Orden:</span> {pedido._id}</p>
              <p><span className='fw-semibold'>Costo Total:</span> ${pedido.totalCost}</p>
              <p> <span className='fw-semibold'>Estado:</span> {pedido.status}</p>
            </div>
          </div >
          <div className='col-lg-1 col-12'>
            <div className='row'>
              <button className='mb-2 btn btn-dark m-auto' type="button" onClick={() => handleEditar(pedido._id)}>Editar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PedidosResultado;

