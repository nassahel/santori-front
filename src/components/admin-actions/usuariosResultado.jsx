import Swal from 'sweetalert2'
const UsuariosResultado = ({ usuarios, editarUsuario, eliminarUsuario }) => {

  const handleEliminar = (id) => {
    Swal.fire({
      title: 'Desea eliminar el usuario',
      icon: 'question',
      iconHtml: '?',
      confirmButtonText: 'Si',
      confirmButtonColor: "#2c4b45",
      cancelButtonText: 'No',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarUsuario(id);
      }
    });
  }  

  const handleEditar = (id) => {
    const respuesta = Swal.fire({
      title: '¿Desea editar el usuario?',
      icon: 'question',
      iconHtml: '?',
      confirmButtonText: 'Si',
      confirmButtonColor: "#2c4b45",
      cancelButtonText: 'No',
      showCancelButton: true,
      showCloseButton: true
    })
    if (respuesta) {
      editarUsuario(id)
    }
  }

  return (
    <div className='container-fluid p-3'>
      <>
        {usuarios.map((usuario, id) => (
          <div key={id} className="row p-2 my-3 rounded bg-white contenedor-agregados agregados-texto">
            <div className='col my-auto'>
              <div className='row'>
                <p className="col-lg-2 mb-1 mb-1 my-lg-auto"> <span className='fw-semibold'>Nombre:</span> {usuario.nombre}</p>
                <p className="col-lg-2 mb-1 mb-1 my-lg-auto"> <span className='fw-semibold'>Email:</span> {usuario.correo}</p>
                <p className="col-lg-2 mb-1 mb-1 my-lg-auto"> <span className='fw-semibold'>Activo:</span> {usuario.estado ? 'Si' : 'No'}</p>
                <p className="col-lg-2 mb-1 mb-1 my-lg-auto"> <span className='fw-semibold'>Direccion:</span> {usuario.direc}</p>
                <p className="col-lg-2 mb-1 mb-1 my-lg-auto"> <span className='fw-semibold'>Rol del Usuario:</span> {usuario.rol === 'USER_ADMIN' ? 'Administrador' : 'Normal'}</p>
              </div>
            </div>
            <div className="col-lg-1 col-12">
              <div className='row'>
                <button className='mb-2 btn btn-dark m-auto' type="button" onClick={() => handleEditar(usuario._id)}>Editar</button>
                <button
                  className='mb-2 btn btn-dark m-auto'
                  onClick={() => handleEliminar(usuario._id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default UsuariosResultado;
