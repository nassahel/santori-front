import React from 'react'
import logoResto from '../../assets/img/hnb.png'

function AboutUs() {
  return (
    <div className='container bg-dark d-flex align-items-center text-center flex-column bg-opacity-75 text-light my-4'>
      <img src={logoResto} width={500} alt="logo" className='py-4 img-fluid' />
      <br />
      <br />
      <h2 className='text-warning mb-3'>Sobre Nosotros</h2>

      <p className='fs-5 w-75'>Bienvenidos a Santorini Restaurant, tu destino gastronómico en el corazón de Argentina. Fundado con pasión y dedicación, nuestro restaurante es un rincón acogedor donde la tradición culinaria argentina se encuentra con la creatividad y la innovación en la cocina.</p>
      <hr className='m-4 p-4 w-50 mx-auto' />
      <h2 className='text-warning mb-3'>Nuestra Historia</h2>

      <p className='fs-5 w-75'>Desde nuestros modestos comienzos en 1988, hemos tenido el honor de llevar a nuestros comensales a un viaje culinario a través de la rica herencia gastronómica de Argentina. Inspirados por la pasión por la comida y el deseo de compartir nuestra cultura, hemos construido un lugar donde la comida es más que solo una necesidad, es una experiencia.
      </p>
      <hr className='m-4 p-4 w-50 mx-auto' />
      <h2 className='text-warning mb-3 '>Nuestra Cocina</h2>

      <p className='fs-5 w-75'>En Santorini Restaurant, la parrilla es el corazón y el alma de nuestra cocina. Nuestros asadores maestros, con años de experiencia, dominan el arte de la parrilla para traerte los cortes de carne más tiernos y sabrosos que puedas encontrar. Cada bocado es una explosión de sabores que te transporta directamente a las pampas argentinas.</p>

      <p className='fs-5 w-75'> Pero no solo somos carne. También celebramos la diversidad culinaria de Argentina, desde las empanadas y las pastas caseras hasta los platos de pescado fresco y las deliciosas opciones vegetarianas. Cada plato es una obra maestra, preparada con ingredientes frescos y auténticos.</p>
      <hr className='m-4 p-4 w-50 mx-auto' />
      <h2 className='text-warning mb-3'>Nuestra Pasión</h2>

      <p className='fs-5 w-75'> En Santorini Restaurant, la pasión por la comida y el servicio al cliente son nuestra razón de ser. Nos esforzamos por crear momentos memorables para nuestros clientes, donde la comida excepcional se combina con un servicio amable y atento. Tu satisfacción es nuestra mayor recompensa.</p>
      <hr className='m-4 p-4 w-50 mx-auto' />
      <h2 className='text-warning mb-3'>Visítanos</h2>

      <p className='fs-5 mb-4 w-75'> Te invitamos a unirte a nosotros en Santorini Restaurant y explorar el sabor auténtico de Argentina en cada bocado. Ya sea para una cena romántica, una reunión familiar o una ocasión especial, estamos aquí para hacerte sentir como en casa en nuestra casa.</p>

      <p className=' fs-5 mt-4 w-75'>Gracias por elegirnos. Esperamos verte pronto en Santorini Restaurant.</p>

      <p className=' fs-5 mt-4 text-warning'>¡Buen provecho!</p>
    </div>
  )
}

export default AboutUs