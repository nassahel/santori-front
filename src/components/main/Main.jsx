import React from 'react'
import './mains.css'
import Spiner from '../spiner/Spiner'
import { CardComidas } from '../card-product/CardProduct'
import { Link } from "react-router-dom";


function Main({ products, searchTerm, loading }) {

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const catEntrees = filteredProducts.filter((comi) => comi.category == 'entradas')
    const catPizzas = filteredProducts.filter((comi) => comi.category == 'pizzas')
    const catMeat = filteredProducts.filter((comi) => comi.category == 'carnes')
    const catDrink = filteredProducts.filter((comi) => comi.category == 'bebidas')
    const catPasta = filteredProducts.filter((comi) => comi.category == 'pastas')

    return (
        <div className='container-fluid pb-4'>
            <div className="green container-fluid col-xl-10 my-4 p-3 rounded">
                <div className="container">
                    <h2 className='text-center mt-3 text-white display-1 py-3 sacramentoFont'>Entradas</h2>
                    {catEntrees.length === 0 && !loading ? (
                        <p className='p-2 text-center bg-light bg-opacity-75 col-lg-6 mx-auto rounded'>No se encontró nada en esta sección...</p>
                    ) : (
                        <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 mb-5'>
                            {loading ? (
                                <Spiner />
                            ) : (
                                catEntrees.map((product) => (
                                    <CardComidas
                                        key={product._id}
                                        product={product}
                                        id={product._id}
                                        name={product.name}
                                        category={product.category}
                                        price={product.price}
                                        image={product.image}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="green container-fluid col-xl-10 my-4 p-3 rounded">
                <div className="container">
                    <h2 className='text-center mt-3 text-white display-1 py-3 sacramentoFont'>Pizzas</h2>
                    {catPizzas.length === 0 && !loading ? (
                        <p className='p-2 text-center bg-light bg-opacity-75 col-lg-6 mx-auto rounded'>No se encontró nada en esta sección...</p>
                    ) : (
                        <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 mb-5'>
                            {loading ? (
                                <Spiner />
                            ) : (
                                catPizzas.map((product) => (
                                    <CardComidas
                                        key={product._id}
                                        product={product}
                                        id={product._id}
                                        name={product.name}
                                        category={product.category}
                                        price={product.price}
                                        image={product.image}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>


            <div className="green container-fluid col-xl-10 my-4 p-3 rounded">
                <div className="container">
                    <h2 className='text-center mt-3 text-white display-1 py-3 sacramentoFont'>Pastas</h2>
                    {catPasta.length === 0 && !loading ? (
                        <p className='p-2 text-center bg-light bg-opacity-75 col-lg-6 mx-auto rounded'>No se encontró nada en esta sección...</p>
                    ) : (
                        <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 mb-5'>
                            {loading ? (
                                <Spiner />
                            ) : (
                                catPasta.map((product) => (
                                    <CardComidas
                                        key={product._id}
                                        product={product}
                                        id={product._id}
                                        name={product.name}
                                        category={product.category}
                                        price={product.price}
                                        image={product.image}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="green container-fluid col-xl-10 my-4 p-3 rounded">
                <div className="container">
                    <h2 className='text-center mt-3 text-white display-1 py-3 sacramentoFont'>Carnes</h2>
                    {catMeat.length === 0 && !loading ? (
                        <p className='p-2 text-center bg-light bg-opacity-75 col-lg-6 mx-auto rounded'>No se encontró nada en esta sección...</p>
                    ) : (
                        <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 mb-5'>
                            {loading ? (
                                <Spiner />
                            ) : (
                                catMeat.map((product) => (
                                    <CardComidas
                                        key={product._id}
                                        product={product}
                                        id={product._id}
                                        name={product.name}
                                        category={product.category}
                                        price={product.price}
                                        image={product.image}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="green container-fluid col-xl-10 my-4 p-3 rounded">
                <div className="container">
                    <h2 className='text-center mt-3 text-white display-1 py-3 sacramentoFont'>Bebidas</h2>
                    {catDrink.length === 0 && !loading ? (
                        <p className='p-2 text-center bg-light bg-opacity-75 col-lg-6 mx-auto rounded'>No se encontró nada en esta sección...</p>
                    ) : (
                        <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 mb-5'>
                            {loading ? (
                                <Spiner />
                            ) : (
                                catDrink.map((product) => (
                                    <CardComidas
                                        key={product._id}
                                        product={product}
                                        id={product._id}
                                        name={product.name}
                                        category={product.category}
                                        price={product.price}
                                        image={product.image}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className='container d-flex justify-content-center mt-3 col-lg-2 col-8 py-3 bg-secondary bg-opacity-25 rounded'>
                <Link to="/orders">
                    <button style={{ backgroundColor: '#344235' }} className='px-5 py-3 rounded fw-bolder border border-light text-light' >Ver carrito</button>
                </Link>
            </div>
        </div>
    )
}

export default Main







