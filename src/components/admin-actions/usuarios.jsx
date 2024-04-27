import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import ListadoUsuarios from './ListadoUsuarios';

function Usuarios({setBtnActive}) {

  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setidUsuario] = useState()
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [estado, setEstado] = useState(false);
  const [rol, setRol] = useState('');
  const [direc, setDirec] = useState('');
  const [editUser, setEditUser] = useState(false)

  let token = localStorage.getItem('token');

  const obtenerUsuarios = async () => {

    const data = await fetch('https://santori-back.onrender.com/api/usuarios');
    const prom = await data.json();
    setUsuarios(prom.usuarios);

  }

  useEffect(() => {
    obtenerUsuarios();
    setBtnActive('Usuarios')
  }, []);


  //AGREGAR USUARIOS AL BACKEND
  const agregarUsuario = async () => {
    try {
      const newUser = {
        nombre,
        correo,
        direc,
        password,
        rol,
        estado
      }
      const response = await fetch('https://santori-back.onrender.com/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('No se pudo agregar el usuario');
      }
      Swal.fire({
        icon: 'success',
        title: 'Genial!',
        text: 'Usuario agregado con éxito',
        confirmButtonColor: "#2c4b45"
      })

      obtenerUsuarios();
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  //EDITAR USUARIOS DEL BACKEND
  const datosEdicion = (id) => {
    const usuarioFind = usuarios.find((usuario) => usuario._id === id);
    if (usuarioFind) {
      setidUsuario(usuarioFind._id)
      setEditUser(true)
      setNombre(usuarioFind.nombre)
      setCorreo(usuarioFind.correo)
      setPassword(usuarioFind.password)
      setRol(usuarioFind.rol)
      setEstado(usuarioFind.estado)
      setDirec(usuarioFind.direc)
    }
  }

  const editarUsuario = async () => {
    try {
      const updatedUser = {
        nombre: nombre,
        correo: correo,
        password: password,
        rol: rol,
        estado: estado,
        direc: direc
      };

      const editIdUsuario = idUsuario;

      const response = await fetch(`https://santori-back.onrender.com/api/usuarios/${editIdUsuario}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'x-token': token,
        },
        body: JSON.stringify(updatedUser)
      })

      if (!response.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo editar el usuario',
          confirmButtonColor: "#2c4b45"
        })
        throw new Error('No se pudo editar el usuario');
      }

      setEditUser(false)

      Swal.fire({
        icon: 'success',
        title: 'Genial!',
        text: 'Usuario editado con éxito',
        confirmButtonColor: "#2c4b45"
      })

      obtenerUsuarios();

    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      const resp = await fetch(`https://santori-back.onrender.com/api/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "x-token": token,
        }
      })

      const data = await resp.json();
      Swal.fire({
        icon: 'success',
        title: 'Genial!',
        text: 'Usuario eliminado con éxito',
        confirmButtonColor: "#2c4b45"
      })
      obtenerUsuarios();
      return data;
    } catch (error) {

      return { msg: "No se conectó con backend" };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !correo || !rol || !direc) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos deben estar completos',
        confirmButtonColor: "#2c4b45"
      })
      return;
    }

    if (editUser) {
      editarUsuario();
    } else {
      agregarUsuario()
    }

    setNombre('');
    setCorreo('');
    setPassword('');
    setEstado(false);
    setRol('');
    setDirec('');
  };

  const sectionInput = 'flex flex-col w-1/3 px-4 py-2 justify-center ';
  const label = 'font-semibold';
  const input = 'border-b border-black bg-neutral-200 outline-none p-1'

  return (
    <main className='flex flex-col gap-8 '>
      <form className="bg-white p-3 rounded-sm flex flex-wrap" onSubmit={handleSubmit}>

        <div className={sectionInput}>
          <label className={label} htmlFor="nombre">Nombre Usuario</label>
          <input className={input} type="text" name="nombre" id="nombre" value={nombre} maxLength={15} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className={sectionInput}>
          <label className={label} htmlFor="email">Email Usuario</label>
          <input className={input} type="text" name="email" id="email" value={correo} maxLength={50} onChange={(e) => setCorreo(e.target.value)} />
        </div>
        <div className={sectionInput}>
          <label className={label} htmlFor="password">Contraseña Usuario</label>
          <input className={input} type="text" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={sectionInput}>
          <label className={label} htmlFor="activo">Usuario Activo</label>
          <select className={input} name="activo" id="activo" value={estado} onChange={(e) => setEstado(e.target.value)}            >
            <option value={"seleccionar"}>Seleccione el estado</option>
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className={sectionInput}>
          <label className={label} htmlFor="direc">Dirección Usuario</label>
          <input className={input} name="direc" id="direc"  value={direc} onChange={(e) => setDirec(e.target.value)} />
        </div>
        <div className={sectionInput}>
          <label className={label} htmlFor="rol">Rol del Usuario</label>
          <select className={input} name="rol" id="rol" value={rol} onChange={(e) => setRol(e.target.value)}            >
            <option value={"seleccionar"}>Roles</option>
            <option value={"USER_ADMIN"}>Administrador</option>
            <option value={"USER_NORMAL"}>Normal</option>
          </select>
        </div>
        <div className='mx-auto mt-2'>
          <input className="bg-neutral-900 hover:bg-neutral-700 duration-300 text-white py-1 w-40" type="submit" value={editUser ? 'Editar Usuario' : 'Agregar Usuario'} />
        </div>
      </form>

      <div className="resultado">
        <ListadoUsuarios />
      </div>
    </main >
  );
}

export default Usuarios;