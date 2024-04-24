import { Link, useParams } from 'react-router-dom'
import entradas from "/assets/img/entries.png"
import pizzas from "/assets/img/pizza.png"
import carne from "/assets/img/meat.png"
import pasta from "/assets/img/pasta.png"
import bebida from "/assets/img/drink.png"


const Categories = () => {

  const { category } = useParams();
  const catDef = category || 'sandwichs'

  const movil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


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
    <section className=' my-4 lg:my-12 xl:w-3/4 mx-auto'>
      <h2 className='font-semibold font-sans text-2xl mb-8 pb-2 border-b-2 border-orange-400'>Buscá por categorías...</h2>
      <div className={`${movil && 'scrollbar-hide'}  flex gap-2 items-center pb-1 justify-start md:justify-center overflow-x-auto  mt-6 w-full 2xl:w-10/12 lg:mx-auto`}>
        {
          categories.map((cate, i) => (
            <Link to={`/${cate.link}`} key={i} className={`${catDef == cate.link && 'border border-black'} w-[150px] lg:w-1/5  hover:bg-yellow-200 group bg-yellow-100 relative lg:h-24 px-3 py-1 rounded-md flex items-center justify-center shadow-md active:shadow-sm duration-300`}>
              <img src={cate.img} alt={cate.title} className='w-20 hidden lg:block' />
              <h3 className='block text-xl font-bold'>{cate.title}</h3>
            </Link>
          ))
        }
      </div>
    </section>
  )
}

export default Categories

