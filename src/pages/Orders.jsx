import { jwtDecode } from 'jwt-decode';
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AppContext } from '../context/ContextProvider';
import tagOferta from '/assets/img/oferta.webp'


const Orders = () => {
  const [orden, setOrden] = useState();
  const [envio, setEnvio] = useState(0)
  const { setNumPedidos } = useContext(AppContext)


  const sendOrder = async () => {
    if (!orden || !orden.productos || orden.productos.length === 0) {
      return Swal.fire("El carrito está vacío", "Agrega productos antes de confirmar el pedido", "warning");
    }
    const token = localStorage.getItem('token');
    if (!token) {
      return Swal.fire("Debes estar logueado para enviar la orden!", "", "info");
    }

    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded.userId;
    } catch (error) {
      console.log(error);
      return Swal.fire("Inicia sesión para enviar la orden", "", "warning");

    }
    const ordenLista = {
      ...orden,
      clientId: userId
    }
    if (ordenLista.clientId === null) return Swal.fire("Debes estar logueado para enviar la orden!", "", "info");

    Swal.fire({
      title: "¿Realizar pedido?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: 'No'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = `${import.meta.env.VITE_URL}orders`
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(ordenLista),
          });
          if (!response.ok) {
            throw new Error("Error al procesar la orden");
          }
          localStorage.removeItem('pedido')
          await Swal.fire("Pedido enviado con exito!", "", "success");
          setOrden(null);
          setNumPedidos(0);
          window.location.reload()
        } catch (error) {
          Swal.fire("No se pudo crear la orden", "", "error");
          return { message: 'no se pudo crear la orden', error }
        }
      }
    });
  }


  const setearOrden = async () => {
    const pedido = await JSON.parse(localStorage.getItem('pedido'))
    setOrden(pedido);
  }

  useEffect(() => {
    setearOrden()
  }, [])

  const deleteItem = (id) => {
    const pedido = JSON.parse(localStorage.getItem('pedido'));
    if (!pedido) return;

    const foundItem = pedido.productos.find(prod => prod._id === id);
    if (!foundItem) return;

    const updatedPedido = {
      ...pedido,
      productos: pedido.productos.filter(prod => prod._id !== id),
      total: pedido.total - foundItem.totalProducto,
    };

    localStorage.setItem('pedido', JSON.stringify(updatedPedido));
    setOrden(updatedPedido);
    setNumPedidos(updatedPedido.productos.length);
  };

  return (
    <div className='w-full max-w-[80rem] mx-auto lg:flex py-6  '>
      <div className='w-full xl:w-3/4 p-2 '>
        <div className='flex flex-col gap-3' >
          {orden == null || orden.productos.length === 0 ? <div className='  border-2 w-full h-[15.5rem] flex items-center text-neutral-700 italic justify-center'><p>No tenés ningun producto en el carrito</p></div>
            :
            (orden.productos.map((prod, i) => (
              <div key={i} className='bg-white border h-[8rem] flex justify-between rounded-md p-4' >
                <div className='w-2/12 overflow-hidden hidden md:inline'>
                  <img src={prod.productImage} alt="" className='h-full w-full object-cover rounded-sm' />
                </div>
                <div className='w-full md:w-9/12 md:ml-6 flex flex-col justify-between'>
                  <div className='flex w-full justify-between'>
                    <div className='flex gap-2 items-center'>
                      <p className='font-semibold'>{prod.name} (${prod.isOffer ? prod.offerPrice : prod.price} c/u) </p>
                      {prod.isOffer && <img src={tagOferta} alt="tag oferta" className='w-16' />}
                    </div>
                    <p className='text-xl'>${prod.totalProducto}</p>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex items-center justify-center gap-4 bg-blue-500 text-white px-2 rounded-full'>
                      {/* <FaMinus className='cursor-pointer' /> */}
                      <p>Cantidad:</p>
                      <p>{prod.quantity}</p>
                      {/* <FaPlus className='cursor-pointer' /> */}
                    </div>
                    <button onClick={() => deleteItem(prod._id)} className='font-semibold hover:underline'>Eliminar</button>
                  </div>
                </div>
              </div>
            )))
          }
        </div>
      </div>

      <div className='lg:w-1/4 p-2 sticky bottom-0'>
        <div className='bg-white border rounded-md p-4 flex flex-col gap-2 lg:gap-4'>
          <div className='border-b pb-2 '>
            <h2 className='text-center text-lg font-semibold '>Resumen de compra</h2>
          </div>
          <div className='flex flex-col lg:gap-1'>
            <div className='flex justify-between'>
              <p>Productos</p>
              <p>${orden ? orden.total : '0'}</p>
            </div>
            <div className='flex justify-between'>
              <p>Envio</p>
              <p className='text-blue-500 font-semibold'>{envio === 0 ? 'Gratis' : envio}</p>
            </div>
            <Link className='flex justify-between'>
              <p className='text-blue-500 font-semibold'>Cupón de descuento</p>
              <p>Sin cupón</p>
            </Link>
          </div>

          <div className='flex flex-col gap-2 '>
            <div className='flex justify-between text-lg font-semibold'>
              <p className=''>Total</p>
              <p>${orden ? orden.total : '0'}</p>
            </div>
            <div>
              <button onClick={sendOrder} className='bg-blue-500 w-full py-1 text-white font-semibold rounded-full hover:bg-blue-600 duration-300'>Confirmar compra</button>
            </div>
          </div>
        </div>
      </div>

    </div>


  )
}

export default Orders