import Link from 'next/link';

import { Product } from '@/types';

import getData from '@/utils/getProducts';
import { ProductCard } from '@/components';

export default async function Menu() {
  const products: Product[] = await getData();

  return (
    <main>
      <section className='pt-12 px-6 max-w-[1540px] mx-auto overflow-x-hidden relative'>
        <div className='flex justify-center items-center mb-12'>
          <Link
            href='/'
            className='text hover:underline hover:text-gray-700 absolute left-[24px]'
          >
            {'<'} Home
          </Link>
          <h2 className='text-2xl font-bold'>Menú</h2>
        </div>
        <div className='flex flex-wrap'>
          {products.map((product) => (
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
    </main>
  );
}
