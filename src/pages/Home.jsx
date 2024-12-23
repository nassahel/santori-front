import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import Categories from '../components/Categories';
import { CardComidas } from '../components/CardComidas';
import Banner from '../components/Banner';
import MostWanted from '../components/MostWanted';
import banner from '/assets/img/banner1.png'
import pedidosya from '/assets/img/banner_pedidosya.jpg'
import bannerRapi from '/assets/img/banner-rapi.jpg'
import { useParams } from 'react-router-dom';
import BuyModal from '../components/modals/BuyModal';
import CardSkeleton from '../components/CardSkeleton';
import { menuesByCateogry } from '../services/products.services';
import { AppContext } from '../context/ContextProvider';


const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);
  const { search } = useContext(AppContext);

  const openCloseModal = (product) => {
    setModal(!modal)
    setSelectedProd(product)
  }

  const { category } = useParams();
  const defCategory = category || 'sandwichs'

  useEffect(() => {
    setLoading(true);
    menuesByCateogry(defCategory)
      .then(setProducts)
      .catch((error) => console.error('Error al obtener los datos:', error))
      .finally(() => setLoading(false));
  }, [category]);


  let filteredProducts = products.filter(item => item.name.toLowerCase().includes(search.trim().toLowerCase()))

  return (
    <div className='relative px-2'>
      {modal && <BuyModal modalAction={openCloseModal} item={selectedProd} />}
      <Categories />
      {
        search === '' ? <div>
          {loading ? <CardSkeleton />
            :
            <div className='flex flex-wrap xl:w-3/4 mx-auto lg:mt-10'>
              {products.length === 0 ? <div className='text-center flex items-center justify-center bg-neutral-200 rounded-md w-full h-[10rem]'> <p>No hay productos en esta categoria 😣</p></div> :
                (products.map((product, i) => (
                  <CardComidas action={() => openCloseModal(product)} key={i} product={product} />
                )))
              }
            </div>}
        </div>
          :
          <div>
            <div className='flex flex-wrap xl:w-3/4 mx-auto lg:mt-10'>
              {filteredProducts.length === 0 ? <div className='text-center flex items-center justify-center bg-neutral-200 rounded-md w-full h-[10rem]'> <p>No hay productos que coincidan</p></div> :
                (filteredProducts.map((product, i) => (
                  <CardComidas action={() => openCloseModal(product)} key={i} product={product} />
                )))
              }
            </div>
          </div>
      }

      <div className='lg:w-[75%] mx-auto px-2'>
        <Banner image={bannerRapi} link='https://www.rappi.com.ar/' />
      </div>
      <MostWanted />
      <div className='lg:w-[75%] mx-auto px-2'>
        <Banner image={banner} />
        <Banner image={pedidosya} link='https://www.pedidosya.com.ar/' />
      </div>

    </div>

  )
}

export default Home



