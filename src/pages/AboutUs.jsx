import React from 'react'
import LogoTransparente from "/assets/img/logo-transparente.png"


function AboutUs() {
  const content = [
    {
      title: "Sobre Nosotros",
      content: "Bienvenidos a Santori Delivery, tu destino gastronómico en el corazón de Argentina. Fundado con pasión y dedicación, nuestro servicio de entrega es una opción confiable donde la tradición culinaria argentina se une con la comodidad y la calidad en cada pedido."
    },
    {
      title: "Nuestra Historia",
      content: "Desde nuestros modestos comienzos en 1988, hemos tenido el honor de llevar a nuestros clientes a un viaje culinario a través de la rica herencia gastronómica de Argentina. Inspirados por la pasión por la comida y el deseo de satisfacer a nuestros clientes, hemos construido un servicio donde la comida es más que solo una necesidad, es una experiencia."
    },
    {
      title: "Nuestra Cocina",
      content: "En Santori Delivery, la calidad es el corazón y el alma de nuestra cocina. Nuestros chefs expertos, con años de experiencia, dominan el arte culinario para traerte los platos más deliciosos y frescos que puedas encontrar. Cada bocado es una explosión de sabores que te transporta directamente a los rincones más auténticos de la gastronomía argentina."
    },
    {
      title: "Nuestra Pasión",
      content: "En Santori Delivery, la pasión por la comida y la satisfacción del cliente son nuestra razón de ser. Nos esforzamos por crear experiencias memorables para nuestros clientes, donde la comida excepcional se combina con un servicio ágil y amigable. Tu satisfacción es nuestra mayor recompensa."
    },
    {
      title: "Visítanos",
      content: "Te invitamos a unirte a nosotros en Santori Delivery y explorar el sabor auténtico de Argentina en cada pedido. Ya sea para una cena rápida, un almuerzo de negocios o una celebración especial, estamos aquí para llevarte una experiencia gastronómica excepcional directamente a tu puerta."
    },
  ];
  return (
    <div className=' w-full lg:text-center py-20 lg:py-10 flex flex-col  px-4 items-center bg-[url(/assets/img/bg1.png)]'>
      <div className='h-28 bg-red-500  px-20 rounded-3xl'>
        <img src={LogoTransparente} alt="" className='h-full' />
      </div>
      <div className='flex flex-col items-center lg:w-3/5 text-lg mt-10'>
        {
          content.map((cont, i) => (
            <div >
              <h2 className='text-red-600 font-semibold mb-3 text-2xl'>{cont.title}</h2>
              <p className='font-medium text-justify lg:text-center'>{cont.content}</p>
              <hr className='m-8 w-50 mx-auto' />
            </div>
          ))
        }
      </div>
      <p className=' font-medium text-xl text-center w-75'>Gracias por elegirnos. Esperamos verte pronto en Santorini Restaurant.</p>
      <p className=' font-semibold text-3xl mt-4 text-red-600'>¡Buen provecho!</p>
    </div>
  )
}

export default AboutUs