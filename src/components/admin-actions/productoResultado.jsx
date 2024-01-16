import Swal from 'sweetalert2'

const Resultado = ({ productos, editarProducto, eliminarProducto }) => {

  const handleEliminar = (id) => {
    Swal.fire({
      title: 'Desea eliminar el producto',
      icon: 'question',
      iconHtml: '?',
      confirmButtonText: 'Si',
      confirmButtonColor: "#2c4b45",
      cancelButtonText: 'No',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProducto(id);
      }
    });
  }

  const handleEditar = (id) => {
    const respuesta = Swal.fire({
      title: 'Desea editar el producto',
      icon: 'question',
      iconHtml: '?',
      confirmButtonText: 'Si',
      confirmButtonColor: "#2c4b45",
      cancelButtonText: 'No',
      showCancelButton: true,
      showCloseButton: true
    })
    if (respuesta) {
      editarProducto(id)
    }
  }


  return (
    <div className='container-fluid p-3'>
      <>
        {productos.map((producto, index) => (
          <div key={index} className="row p-2 my-3 rounded bg-white contenedor-agregados agregados-texto">
            <div className='col my-auto'>
              <div className='row '>
                <div className='col-lg-1 col-5 mx-auto'>
                  <img className='img-fluid col-12' src={producto.image} alt="imagen de comida" />
                </div>
                <p className='col-12 col-lg-2 mb-1 my-lg-auto'><span className='fw-semibold'>Nombre: </span> {producto.name.toLowerCase()}</p>
                <p className='col-12 col-lg-2 mb-1 my-lg-auto d-flex'> <span className='fw-semibold'>Precio: </span> {producto.price}</p>
                <p className='col-12 col-lg-2 mb-1 my-lg-auto d-flex'> <span className='fw-semibold'>Activo: </span> {producto.active ? 'Si' : 'No'}</p>
                <p className='col-12 col-lg-2 mb-1 my-lg-auto d-flex'> <span className='fw-semibold'>Categoria: </span> {producto.category}</p>
                <p className='col-12 col-lg-3 text-start my-auto'> <span className='fw-semibold'>Descripcion: </span> {producto.detail}</p>
              </div>
            </div>
            <div className='col-lg-1 col-12'>
              <div className='row'>
                <button className='mb-2 btn btn-dark m-auto' type="button" onClick={() => handleEditar(producto._id)}>Editar</button>
                <button
                  className='mb-2 btn btn-dark m-auto'
                  onClick={() => { handleEliminar(producto._id) }} >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </>

    </div>
  )
}

export default Resultado