import React from 'react'
import { useState, useEffect } from 'react'
import Main from '../../components/main/Main'
import SearchBar from '../../components/search-bar/SearchBar'


function Home() {

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);




  const productsStore = async () => {
    try {
      setLoading(true);
      const data = await fetch('https://santori-back.onrender.com/api/menu');
      
      if (!data.ok) {
        throw new Error('No se pudo obtener los datos del servidor');
      }
  
      const prom = await data.json();
      const menues = prom.menues;


      const filtered = menues.filter((prod)=> prod.active == true )

      console.log(filtered);
      
      setProducts(filtered);
      setLoading(false);


    } catch (error) {
      console.error('Ocurrió un error:', error);
      
    }
  }
  


  useEffect(() => {
    productsStore();
  }, []);

  return (
    <div className='container-fluid home'>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Main loading={loading} products={products} searchTerm={searchTerm} />

    </div>
  )
}

export default Home