import { Link, useParams } from 'react-router-dom'
import entradas from "/assets/img/entries.png"
import pizzas from "/assets/img/pizza.png"
import carne from "/assets/img/meat.png"
import pasta from "/assets/img/pasta.png"
import bebida from "/assets/img/drink.png"


const Categories = () => {

  const { category } = useParams();
  const catDef = category || 'sandwichs'


  const categories = [
    {
      title: "Sandwichs",
      link: "sandwichs",
      img: entradas,
    },
    {
      title: "Pizzas",
      link: "pizzas",
      img: pizzas,
    },
    {
      title: "Carnes",
      link: "carnes",
      img: carne,
    },
    {
      title: "Pastas",
      link: "pastas",
      img: pasta,
    },
    {
      title: "Bebidas",
      link: "bebidas",
      img: bebida,
    },
  ]

  return (
    <section className=' my-20 lg:my-12 xl:w-3/4 mx-auto'>
      <h2 className='font-semibold font-sans text-2xl mb-8 pb-2 border-b-2 border-orange-400'>Buscá por categorías...</h2>
      <div className='flex gap-2 items-center justify-center mt-6 2xl:w-10/12 mx-auto'>
        {
          categories.map((cate, i) => (
            <Link to={`/${cate.link}`} key={i} className={`${catDef == cate.link && 'border border-black'} w-1/5 overflow-hidden hover:bg-yellow-200 group bg-yellow-100 relative h-24 px-3 py-1 rounded-md flex items-center justify-center shadow-md active:shadow-sm  duration-300`}>

              <img src={cate.img} alt={cate.title} className='w-20' />
              <h3 className='hidden lg:block text-xl font-bold'>{cate.title}</h3>
            </Link>
          ))
        }
      </div>

    </section>
  )
}

export default Categories

