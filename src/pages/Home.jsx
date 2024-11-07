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
import CardSkeleton from '../components/CardSkeleton';
import AlertModal from '../components/AlertModal';


const Home = ({ setNumPedidos }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);


  const openCloseModal = (product) => {
    !modal ? setModal(true) : setModal(false)
    setSelectedProd(product)
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
      setLoading(false);
    } catch (error) {
      console.error('Ocurrió un error:', error);

    }
  }

  useEffect(() => {
    productsStore();
  }, [category]);

  return (
    <div className='relative px-2'>
      {modal && <BuyModal modalAction={openCloseModal} item={selectedProd} setNumPedidos={setNumPedidos} />}

      <Categories />
      {loading && <CardSkeleton />}
      <div className='flex flex-wrap xl:w-3/4 mx-auto lg:mt-10'>
        {
          (products.map((product, i) => (
            <CardComidas action={() => openCloseModal(product)} key={i} product={product} />
          )))
        }
      </div>
      <Banner image={bannerRapi} />

      <MostWanted />
      <Banner image={banner} />

    </div>

  )
}

export default Home



