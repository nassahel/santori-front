import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import ListadoMenus from './ListadoMenus';

function Productos({setBtnActive}) {

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

    const data = await fetch('https://santori-back.onrender.com/api/menu');
    const prom = await data.json();
    setProductos(prom.menues);

  }

  useEffect(() => {
    productsStore();
    setBtnActive('Menus')
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

      const url = 'https://santori-back.onrender.com/api/menu';
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

      const url = `https://santori-back.onrender.com/api/menu/${editIdProduct}`; // Incluir el ID en la URL
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
      const url = `https://santori-back.onrender.com/api/menu`;
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


  const sectionInput = 'flex flex-col w-1/3 px-4 py-2 justify-center ';
  const label = 'font-semibold';
  const input = 'border-b border-black bg-neutral-200 outline-none p-1'


  return (
    <main className='flex flex-col gap-8 '>
      <form className=" bg-white p-3 rounded-sm flex gap-4" onSubmit={handleSubmit}>


        <div className={`flex flex-col w-1/4 grow py-2`}>
          <label className={label} htmlFor="descripcion">Descripción de Producto</label>
          <textarea className={`${input} resize-none grow flex`} name="descripcion" id="descripcion" value={detail} maxLength={200} onChange={(e) => setDetail(e.target.value)}></textarea>
        </div>

        <div className='flex flex-wrap'>
          <div className={sectionInput}>
            <label className={label} htmlFor="nombre">Nombre de Producto</label>
            <input className={input} type="text" name="nombre" id="nombre" value={name} maxLength={30} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className={sectionInput}>
            <label className={label} htmlFor="precio">Precio del Producto</label>
            <input className={input} type="number" name="precio" id="precio" value={price}
              onChange={(e) => {
                const inputValue = parseFloat(e.target.value);
                if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 99999) {
                  setPrice(inputValue);
                }
              }}
            />
          </div>

          <div className={sectionInput}>
            <label className={label} htmlFor="imagen">Link de Imagen</label>
            <input className={input} type="text" name="imagen" id="imagen" maxLength={200} value={image} onChange={(e) => setImage(e.target.value)} />
          </div>



          <div className={sectionInput}>
            <label className={label} htmlFor="activo">Producto Activo</label>
            <select className={input} name="activo" id="activo" value={active} onChange={(e) => setActive(e.target.value === 'true')}            >
              <option value={"seleccionar"}>Seleccionar</option>
              <option value={true}>Si</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className={sectionInput}>
            <label className={label} htmlFor="categoria">Categoría del Producto</label>
            <select className={input} name="categoria" id="categoria" value={category} onChange={(e) => setCategory(e.target.value)}            >
              <option value={"Productos"} >Productos</option>
              <option value={"Pizzas"}>Pizzas</option>
              <option value={"Entradas"}>Entradas</option>
              <option value={"Carnes"}>Carnes</option>
              <option value={"Bebidas"}>Bebidas</option>
              <option value={"Pastas"}>Pastas</option>
            </select>
          </div>






          <div className={`${sectionInput} flex items-center justify-end`}>
            <button className="bg-neutral-900 hover:bg-neutral-700 duration-300 text-white py-1 w-40" type="submit" >{editProduct ? 'Editar Producto' : 'Agregar Producto'}</button>
          </div>
        </div>


      </form>

      <div className="">
        <ListadoMenus />
      </div>
    </main>



  );
}

export default Productos;