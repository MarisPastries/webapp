import Image from 'next/image';
import Link from 'next/link';
import { Hero, ProductCard } from '@/components';
import { Product } from '@/types';
import getData from '@/utils/getProducts';

export default async function Home() {
  const products: Product[] = await getData();

  const featuredProducts = products.filter(
    (product) => product.featured === true,
  );

  return (
    <main>
      <Hero />
      <div className='px-6 max-w-[1540px] mx-auto overflow-x-hidden'>
        {/* Productos Destacados */}
        <section className='py-10 h-auto w-full flex flex-col'>
          <h3 className='text-xl font-bold mb-8 md:text-2xl'>
            Productos Destacados
          </h3>

          <div className='flex flex-wrap justify-center gap-4'>
            {featuredProducts.map((product) => (
              <ProductCard
                title={product.title}
                price={product.prices[0]}
                image={product.imageUrl[0]}
                key={product.imageUrl[0]}
                buttonText='Saber más...'
              />
            ))}
          </div>
        </section>
        {/* Tarjeta de Relleno - Mobile */}
        <div className='max-w-[500px] min-w-[300px] h-[440px] rounded-xl mx-auto relative bg-tarjetaRelleno bg-cover bg-center md:hidden'>
          <div className='backdrop-blur-md max-w-[502px] min-w-[302px] h-[440px] rounded-xl px-5 py-12 flex flex-col justify-between absolute top-0 -left-[1px] '>
            <div>
              <h3 className='text-lg font-bold mb-4'>
                Los postres más deliciosos
              </h3>

              <p className=''>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis et optio incidunt praesentium ipsam ipsa quibusdam
                hic! Recusandae, esse, saepe quidem aliquam consequatur delectus
                cumque error deleniti modi, provident quis.
              </p>
            </div>
            <Link
              href='/'
              className='bg-secondary text-light px-6 py-2 rounded-full self-end'
            >
              Conocer el Menú
            </Link>
          </div>
        </div>
        {/* Tarjeta de Relleno - Desktop */}
        <div className='hidden md:flex bg-pink rounded-xl w-fit h-auto min-h-[350px] mx-auto'>
          <div className='max-w-[600px] min-w-[450px] h-auto px-12 flex flex-col gap-6 justify-center'>
            <h3 className='text-2xl font-bold mb-4'>
              Los postres más deliciosos
            </h3>

            <p className=''>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis et optio incidunt praesentium ipsam ipsa quibusdam hic!
              Recusandae, esse, saepe quidem aliquam consequatur delectus cumque
              error deleniti modi, provident quis.
            </p>

            <Link
              href='/'
              className='bg-secondary text-light w-fit px-6 py-2 rounded-full'
            >
              Conocer el Menú
            </Link>
          </div>
          <Image
            src='/logo.jpg'
            alt='Logo Maris Pastries'
            width={600}
            height={600}
            className='min-w-[350px] object-cover'
          />
        </div>
        {/* Más Vendidos */}
        <section className='relative py-10 h-auto w-full flex flex-col flex-wrap'>
          <h3 className='text-xl font-bold mb-8 md:text-2xl'>Más Vendidos</h3>
          <div className='overflow-x-auto w-screen max-w-[1540px] mx-auto flex gap-8 pr-12'>
            {products
              .filter((product) => product.trending === true)
              .map((product) => (
                <ProductCard
                  title={product.title}
                  price={product.prices[0]}
                  image={product.imageUrl[0]}
                  key={product.imageUrl[0]}
                  buttonText='Saber más...'
                />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
