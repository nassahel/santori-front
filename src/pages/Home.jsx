import React from 'react'
import { useState, useEffect } from 'react'
import Categories from '../components/Categories';
import { CardComidas } from '../components/CardComidas';
import Banner from '../components/Banner';
import MostWanted from '../components/MostWanted';
import banner from '/assets/img/banner1.png'
import bannerYa from '/assets/img/baner-ya.png'
import bannerRapi from '/assets/img/banner-rapi.jpg'
import { useParams } from 'react-router-dom';
import BuyModal from '../components/BuyModal';


const Home = () => {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  

  const openCloseModal = () => {
   !modal ? setModal(true) : setModal(false)
  }

const { category } = useParams();

const defCategory = category || 'sandwichs'

  const productsStore = async () => {
    try {
      const data = await fetch(`https://santori-back.onrender.com/api/menu/${defCategory}`);

      if (!data.ok) {
        throw new Error('No se pudo obtener los datos del servidor');
      }
      const prom = await data.json();
      const menues = prom;

      setProducts(menues);
    } catch (error) {
      console.error('Ocurrió un error:', error);

    }
  }

  useEffect(() => {
    productsStore();
  }, [category]);

  return (
    <div className='relative px-10'>
      {modal && <BuyModal modalAction={openCloseModal} />}
      
      <Categories />
      <div className='flex flex-wrap w-3/4 mx-auto mt-10'>
        {
          products.map((product, i) => (
            <CardComidas action={openCloseModal} key={i} product={product} />
          ))
        }
      </div>
      <Banner image1={bannerYa} image2={bannerRapi} />
      <MostWanted/>
      <Banner image1={banner} />
      
    </div>

  )
}

export default Home



