import { useEffect, useState } from 'react';
import Resultado from './productoResultado';
import Swal from 'sweetalert2'

function Productos() {

  const [productos, setProductos] = useState([]);
  const [idProducto, setidProduct] = useState()
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [active, setActive] = useState(false);
  const [editProduct, setEditProduct] = useState(false)

  let token = localStorage.getItem('token');

  const productsStore = async () => {

    const data = await fetch('https://backend-rolling53i.onrender.com/api/menu');
    const prom = await data.json();
    setProductos(prom.menues);

  }

  useEffect(() => {
    productsStore();
  }, []);


  const agregarProductos = async () => {
    try {
      const newProduct = {
        name,
        detail,
        image,
        price: Number(price),
        category,
        active
      };

      const url = 'https://backend-rolling53i.onrender.com/api/menu';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'x-token': token,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('No se pudo agregar el producto');
      }
      Swal.fire({
        icon: 'success',
        title: 'Genial!',
        text: 'Producto agregado con éxito',
        confirmButtonColor: "#2c4b45"
      })

      productsStore();
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  //EDITAR PRODUCTOS DEL BACKEND
  const datosEdicion = (id) => {
    const productoFind = productos.find((producto) => producto._id === id);
    if (productoFind) {
      setidProduct(productoFind._id)
      setEditProduct(true)
      setName(productoFind.name.toLowerCase())
      setDetail(productoFind.detail)
      setImage(productoFind.image)
      setPrice(productoFind.price)
      setCategory(productoFind.category)
      setActive(productoFind.active)
    }
  }

  const editarProducto = async () => {
    try {
      const updatedProduct = {
        name: name,
        detail: detail,
        image: image,
        price: price,
        category: category,
        active: active
      };

      const editIdProduct = idProducto;

      const url = `https://backend-rolling53i.onrender.com/api/menu/${editIdProduct}`; // Incluir el ID en la URL
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'x-token': token,
        },
        body: JSON.stringify(updatedProduct)
      });

      if (!response.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo editar el producto',
          confirmButtonColor: "#2c4b45"
        })
        throw new Error('No se pudo editar el producto');
      }

      setEditProduct(false)

      Swal.fire({
        icon: 'success',
        title: 'Genial!',
        text: 'Producto editado con éxito',
        confirmButtonColor: "#2c4b45"
      })

      productsStore();

    } catch (error) {
      console.error('Error al editar el Producto:', error);
    }
  };


  //ELIMINAR LOS PRODUCTOS DEL BACKEND
  const eliminarProducto = async (id) => {
    try {
      const url = `https://backend-rolling53i.onrender.com/api/menu`;
      const resp = await fetch(url + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "x-token": token,
        }
      });

      const data = await resp.json();
      Swal.fire({
        icon: 'success',
        title: 'Genial!',
        text: 'Producto eliminado con éxito',
        confirmButtonColor: "#2c4b45"
      })
      productsStore();
      return data;
    } catch (error) {

      return { msg: "No se conectó con backend" };
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    if (!name || !detail || !image || !price || !category) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos deben estar completos',
        confirmButtonColor: "#2c4b45"
      })
      return;
    }

    if (editProduct) {
      editarProducto()
    } else {
      agregarProductos()
    }

    setName('');
    setDetail('');
    setImage('');
    setPrice(0);
    setCategory('');
    setActive(false);
  };

  return (
    <main className='container-fluid col-lg-11'>
      <form className=" m-auto producto-contenedor bg-white p-2 rounded" onSubmit={handleSubmit}>
        <div className='row mt-4'>

          <div className='col-lg-4 text-center mt-2'>
            <label className='col-12 producto-texto fs-6' htmlFor="nombre">Nombre de Producto</label>
            <input
              className='input-productos col-4 p-1 input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              value={name}
              maxLength={30}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='col-lg-4 text-center mt-2'>
            <label className='col-12 producto-texto fs-6' htmlFor="precio">Precio del Producto</label>
            <input
              className='input-productos col-4 p-1 input-nombre rounded border border-black border-opacity-50'
              type="number"
              name="precio"
              id="precio"
              placeholder="Precio del Producto"
              value={price}
              onChange={(e) => {
                const inputValue = parseFloat(e.target.value);
                if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 99999) {
                  setPrice(inputValue);
                }
              }}
            />
          </div>

          <div className='col-lg-4 text-center mt-2'>
            <label className='col-12 producto-texto fs-6' htmlFor="imagen">Link de Imagen</label>
            <input
              className='input-productos col-4 p-1 input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="imagen"
              id="imagen"
              placeholder="Imagen"
              maxLength={100}
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

        </div>
        <div className='row mt-lg-4 mt-2'>
          <div className='col-lg-4 text-center'>
            <label className='col-12 producto-texto fs-6' htmlFor="activo">Producto Activo</label>
            <select
              className='col-lg-4 col-4 input-productos p-1  input-nombre rounded border border-black border-opacity-50'
              name="activo"
              id="activo"
              placeholder="Producto Activo"
              value={active}
              onChange={(e) => setActive(e.target.value === 'true')}
            >
              <option value={"seleccionar"}>Seleccionar</option>
              <option value={true}>Si</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className='col-lg-4 mt-2 text-center'>
            <label className='col-12 producto-texto fs-6' htmlFor="categoria">Categoría del Producto</label>
            <select
              className='col-lg-4 col-4 input-productos p-1 input-nombre rounded border border-black border-opacity-50'
              name="categoria"
              id="categoria"
              placeholder="Categoría del Producto"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={"Productos"} >Productos</option>
              <option value={"Pizzas"}>Pizzas</option>
              <option value={"Entradas"}>Entradas</option>
              <option value={"Carnes"}>Carnes</option>
              <option value={"Bebidas"}>Bebidas</option>
              <option value={"Pastas"}>Pastas</option>
            </select>
          </div>


          <div className='col-lg-4 mt-2 text-center'>
            <label className='col-12 producto-texto fs-6' htmlFor="descripcion">Descripción de Producto</label>
            <input
              className='mt-0 input-descripcion col-4 p-1 input-nombre rounded border border-black border-opacity-50'
              name="descripcion"
              type='text'
              id="descripcion"
              placeholder="Descripción"
              value={detail}
              maxLength={50}
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>
        </div>

        <div className='col-lg-4-md-12'>
          <div className='mt-2 text-center'>
            <input
              className="my-2 mb-3 btn btn-dark"
              type="submit"
              value={editProduct ? 'Editar Producto' : 'Agregar Producto'}
            />
          </div>
        </div>
      </form>

      <div className="resultado">
        <Resultado
          productos={productos}
          editarProducto={datosEdicion}
          eliminarProducto={eliminarProducto}
        />
      </div>
    </main>



  );
}

export default Productos;