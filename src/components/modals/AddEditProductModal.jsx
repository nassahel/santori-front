import React, { useState } from 'react'
import Swal from 'sweetalert2';

const AddEditProductModal = ({ setModal, productEdit, modalEdit, setModalEdit }) => {
    const [nombre, setNombre] = useState(modalEdit ? productEdit.name : '')
    const [descripcion, setDescripcion] = useState(modalEdit ? productEdit.description : '')
    const [imagen, setImagen] = useState(modalEdit ? productEdit.productImage : '')
    const [precio, setPrecio] = useState(modalEdit ? productEdit.price : 0)
    const [categoria, setCategoria] = useState(modalEdit ? productEdit.category : '')
    const [oferta, setOferta] = useState(modalEdit ? productEdit.isOfffer : false)
    const [precioOferta, setPrecioOferta] = useState(modalEdit ? productEdit.offerPrice : 0)

    const createProduct = async () => {
        if (nombre === ''
            || descripcion === ''
            || imagen === ''
            || categoria === '')
            return Swal.fire('Todos los campos deben estar completos', '', 'info')

        const url = modalEdit
            ? `${import.meta.env.VITE_URL}products/${productEdit._id}`
            : `${import.meta.env.VITE_URL}products/`

        const method = modalEdit ? 'PUT' : 'POST'
        const token = localStorage.getItem('token');
        if (!token) return console.log('No se pudo obtener el token');
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: nombre,
                    description: descripcion,
                    productImage: imagen,
                    price: precio,
                    category: categoria,
                    isOffer: oferta,
                    offerPrice: precioOferta
                })
            })
            const data = await response.json()
            setNombre('')
            setDescripcion('')
            setImagen('')
            setPrecio(0)
            setCategoria('')
            setPrecioOferta(0)
            setModal(false)
            Swal.fire(modalEdit ? 'Producto editado!' : 'Producto creado!', '', 'success')
            return data
        } catch (error) {
            return console.error(error);
        }
    }

    const closeModal = () => {
        setModal(false)
        setModalEdit(false)
    }

    const inputStyle = 'mb-6 border-b bg-neutral-100 px-2 py-1 outline-none';

    return (
        <section className='fixed z-40 top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
            <div onClick={closeModal} className='fixed z-40 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/50'></div>
            <article className=' bg-white min-h-4/6 w-11/12 h-[36rem] max-w-[30rem] rounded-md relative shadow py-6 px-10 z-50 flex flex-col items-center '>
                <h2 className='mb-6 '>{modalEdit ? 'Editar Producto' : 'Agregar Producto'} </h2>
                <div className='flex flex-col h-full w-full'>
                    <input value={nombre} onChange={(e) => setNombre(e.target.value)} maxLength={50} className={inputStyle} type="text" name="nombre" placeholder='Nombre' />
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} maxLength={120} className={`resize-none h-[5.5rem] ${inputStyle}`} name="description" placeholder='Descripción'></textarea>
                    <input value={imagen} onChange={(e) => setImagen(e.target.value)} maxLength={150} className={inputStyle} type="text" name="" id="" placeholder='Nueva imagen' />
                    <input value={precio} onChange={(e) => setPrecio(e.target.value)} maxLength={6} max={100000} className={inputStyle} type="number" name="price" placeholder='Precio' />
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className={inputStyle} name="category" id="category" >
                        <option value="">Categoría</option>
                        <option value="sandwichs">Sándwichs</option>
                        <option value="pizzas">Pizzas</option>
                        <option value="minutas">Minutas</option>
                        <option value="pastas">Pastas</option>
                        <option value="bebidas">Bebidas</option>
                    </select>
                    <div className='flex items-center gap-2 mb-6 '>
                        <input value={oferta} onClick={() => setOferta(!oferta)} className='cursor-pointer' type="checkbox" name="oferta" id="oferta" />
                        <label className='cursor-pointer' htmlFor="oferta">En oferta</label>
                    </div>
                    <input value={precioOferta} onChange={(e) => setPrecioOferta(e.target.value)} disabled={!oferta} className={inputStyle} type="number" name="precio-oferta" placeholder='Precio de oferta' />
                    <div className='flex gap-4'>
                        <button onClick={createProduct} className='bg-neutral-800 mt-auto rounded-sm w-[8rem] mx-auto py-1 text-white hover:bg-neutral-700 duration-200'>{modalEdit ? 'Confirmar' : 'Guardar'}</button>
                        <button onClick={closeModal} className='bg-neutral-600 mt-auto rounded-sm w-[8rem] mx-auto py-1 text-white hover:bg-neutral-500 duration-200'>Cancelar</button>
                    </div>

                </div>
            </article>
        </section>
    )
}

export default AddEditProductModal