import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const BuyModal = ({ modalAction, item, setNumPedidos }) => {
  const [cant, setCant] = useState(1)
  const [total, setTotal] = useState(null)
  const [coment, setComent] = useState('')

  useEffect(() => {
    setTotal(cant * item.price)
  }, [cant])



  const saveLocal = () => {
    // const { userId } = jwtDecode(localStorage.getItem('token'))
    setTotal(cant * item.price)

    const itemPedido = {
      ...item,
      quantity: cant,
      totalProducto: total,
      comentario: coment
    }
    if (!localStorage.getItem('pedido')) {
      const pedido = {
        productos: [],
        total: itemPedido.totalProducto,
        clientId: null
      };
      pedido.productos.push(itemPedido)
      localStorage.setItem('pedido', JSON.stringify(pedido))
    } else {
      const pedido = JSON.parse(localStorage.getItem('pedido'))
      const itemFound = pedido.productos.find(objeto => objeto.name === item.name);
      console.log('producto', itemFound);
      if (itemFound) {
        itemFound.quantity += cant;
        console.log('pedido actualizado', pedido);
        localStorage.setItem('pedido', JSON.stringify(pedido))

      } else {
        pedido.productos.push(itemPedido)
        let totalPedido = 0;
        pedido.productos.forEach((prod) => (
          console.log(prod),
          totalPedido = totalPedido + prod.totalProducto
        ))
        pedido.total = totalPedido
        localStorage.setItem('pedido', JSON.stringify(pedido))
      }
    }
    const pedid = JSON.parse(localStorage.getItem('pedido'))
    setNumPedidos(pedid.productos.length)
    modalAction()
  }


  return (
    <section className='fixed z-40 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/50'>
      <article className=' bg-white min-h-4/6 w-11/12 max-w-[30rem] rounded-md relative shadow py-3 px-4 z-50 flex flex-col items-center justify-between'>
        <div className='w-full flex flex-col items-center'>
          <div className='flex text-xl  font-semibold mb-2'>
            <h2 className='w-11/12 text-center ml-6'>{item.name}</h2>
            <AiOutlineClose onClick={modalAction} className='w-1/12 cursor-pointer mr-2 absolute right-0' />
          </div>
          <img src={item.productImage} alt={item.name} className='w-10/12 max-h-[13rem] object-cover rounded-md mb-4' />
          <div className='flex justify-between items-center'>
            <p className='w-9/12 '>{item.description}</p>
            <p className='w-2/12 font-bold text-xl text-end'>${item.price}</p>
          </div>
        </div>
        <div className='w-full'>
          <div className='flex justify-between w-full mt-4 font-semibold text-lg bg-neutral-200 py-2 px-4 rounded-md'>
            <p>Unidades</p>
            <div className='flex gap-2 items-center justify-between w-20'>
              <FaMinus onClick={() => (cant > 1 && setCant(cant - 1))} className='cursor-pointer' />
              <p>{cant}</p>
              <FaPlus onClick={() => (cant < 10 && setCant(cant + 1))} className='cursor-pointer' />
            </div>
          </div>
          <div className='w-full mt-4'>
            <p>Notas para el restaurante:</p>
            <textarea onChange={(e) => setComent(e.target.value)} name="" id="" cols="30" rows="3" maxLength={200} className='bg-neutral-100 rounded-md w-full resize-none text-neutral-600 focus:outline-none p-2 border-b border-neutral-400'></textarea>
          </div>
          <Link onClick={saveLocal} className='w-full bg-orange-400 hover:bg-orange-500 duration-200 text-white font-semibold flex justify-between rounded-full py-2 mt-2 px-4'>
            <span>{cant}</span>
            <span>Agregar al pedido</span>
            <span>${total}</span>
          </Link>
        </div>

      </article>

    </section>
  )
}

export default BuyModal