import React, { useContext, useState } from "react";
import { CartContext } from "../cart-context/CartContext";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";

export const CardComidas = ({ product, id, name, category, price, image }) => {

    const [cart, setCart] = useContext(CartContext);

    const addToCard = () => {
        setCart((currItems) => {
            const isItemsFound = currItems.find((item) => item.id === id);
            if (isItemsFound) {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item;
                    }
                });
            } else {
                return [...currItems, { id, name, category, price, image, quantity: 1 }]
            }
        })
    }

    const removeItem = (id) => {
        setCart((currItems) => {
            if (currItems.find((item) => item.id === id)?.quantity === 1) {
                return currItems.filter((item) => item.id !== id);
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const getQuantityById = (id) => {
        return cart.find((item) => item.id === id)?.quantity || 0;
    }

    const quantity = getQuantityById(id);

    return (
        <div className="col p-3 col-lg-3">
            <div className="card  rounded text-center border-1  p-1 h-100">
                <img className='img-fluid mx-auto rounded' src={product.image} alt={product.name} />
                <div className="card-body d-flex flex-column justify-content-end">
                    <h5 className='card-title'>{product.name}</h5>
                    <h5 className='card-title text-info'>${product.price}</h5>
                    <hr className='m-1' />
                    <h6 className="fw-bolder mt-2">Cantidad</h6>
                    <div className='mb-2 d-flex justify-content-center align-items-center'>
                        <AiFillMinusSquare onClick={() => removeItem(id)} color="green" size={50} />
                        <span className="px-4 py-2 mx-3 border text-center align-items fw-bolder">{quantity}</span>
                        <AiFillPlusSquare onClick={() => addToCard()} color="green" size={50} />


                    </div>
                </div>
            </div>
        </div>
    )
}