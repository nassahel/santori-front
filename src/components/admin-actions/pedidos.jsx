import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import ListadoPedidos from "./ListadoPedidos";


const Pedidos = ({setBtnActive}) => {
  useEffect(() => {   
    setBtnActive('Pedidos')
  }, []);


  return (
    <main className="container-fluid col-lg-11">     
        <ListadoPedidos/>       
    </main>
  );
  
}

export default Pedidos;
