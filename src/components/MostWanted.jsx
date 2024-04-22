import React from 'react'
import Burg from "/assets/img/most-burger.png"
import Pizz from "/assets/img/most-pizza.png"
import Sushi from "/assets/img/most-sushi.png"
import { Link } from 'react-router-dom'


const MostWanted = () => {
  const foods = [
    { id: "1", name: "Hamburguesas", img: Burg, link: "#" },
    { id: "2", name: "Pizzas", img: Pizz, link: "#" },
    { id: "3", name: "Sushi", img: Sushi, link: "#" },
  ]

  return (
    <section className='lg:w-3/4 mx-auto my-12'>
      <h2 className='font-semibold font-sans text-2xl mb-8 pb-2 border-b-2 border-orange-400'>Las mas pedidas...</h2>
      <div className='flex justify-center gap-4 flex-col lg:flex-row items-center'>
        {
          foods.map((food, i) => (
            <Link to="*" key={food.id} className='lg:w-72 w-9/12 group h-48 border flex items-center justify-center relative rounded-xl bg-white shadow-sm hover:shadow-lg'>
              <img src={food.img} alt={food.name} className='h-4/5 group-hover:scale-125 duration-300' />
              <p className='absolute bottom-2 right-3 font-bold text-3xl'>{food.name}</p>
            </Link>
          ))
        }
      </div>
    </section>
  )
}

export default MostWanted