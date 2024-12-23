import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/users.services';
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';

const ListadoUsuarios = ({ setBtnActive }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteUser = async (idUsuario) => {
    Swal.fire({
      title: "Realmente deseas borrar el usuario?",
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          const url = `${import.meta.env.VITE_URL}users/`;
          const response = await fetch(url + idUsuario, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-type': 'application/json',
            },
          });

          if (response.status === 403) {
            const responseData = await response.json();
            Swal.fire(responseData.message || "No se pudo eliminar el usuario", "Solo el propietario puede eliminar Administradores.", "error");
            return;
          }

          if (response.ok) {
            setUsuarios((prevUsuarios) => prevUsuarios.filter((user) => user._id !== idUsuario));
            Swal.fire("Usuario eliminado", "", "success");
          } else if (response.status === 404) {
            Swal.fire("Usuario no encontrado", "", "error");
          } else {
            Swal.fire("No se pudo eliminar el usuario", "", "error");
          }
        } catch (error) {
          console.log('No se pudo eliminar el usuario', error);
          Swal.fire("Hubo un error al intentar eliminar el usuario", "", "error");
        }
      }
    });
  };

  useEffect(() => {
    setBtnActive('Usuarios');
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setUsuarios(users);
      } catch (error) {
        console.error("Error al obtener usuarios", error);
        Swal.fire("Error al cargar los usuarios", "", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setBtnActive]);

  return (
    <section className=''>
      <div className='flex justify-end'>
        <button className='bg-white py-2 px-4 my-2 rounded-md border-2 border-neutral-400 hover:border-black duration-200'>Agregar Usuario</button>
      </div>
      <div className='bg-white'>
        <div className='flex bg-neutral-800 text-white'>
          <p className='w-1/4 border px-2 py-1'>Rol</p>
          <p className='w-1/4 border px-2 py-1'>Nombre</p>
          <p className='w-1/4 border px-2 py-1'>Email</p>
          <p className='w-1/4 border px-2 py-1'>Direccion</p>
          <p className='bg-red-600 text-white border px-2 py-1'><FaRegTrashAlt /></p>
        </div>

        {loading ? (
          <div>Cargando...</div>
        ) : (
          usuarios.map((item) => (
            <div key={item._id} className='flex hover:bg-neutral-200 duration-200'>
              <p className='w-1/4 border px-2 py-1'>{item.rol}</p>
              <p className='w-1/4 border px-2 py-1'>{item.name}</p>
              <p className='w-1/4 border px-2 py-1'>{item.email}</p>
              <p className='w-1/4 border px-2 py-1'>{item.direction}</p>
              <button onClick={() => deleteUser(item._id)} className='text-red-600 border px-2 py-1'>
                <FaRegTrashAlt />
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ListadoUsuarios;
