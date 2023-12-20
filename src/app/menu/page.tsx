import Link from 'next/link';

import { Product, Category } from '@/types';

import { getProducts, getCategories } from '@/utils/getData';
import { Menu } from '@/components';

export default async function MenuPage() {
  const products: Product[] = await getProducts();
  const categories: Category[] = await getCategories();

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
        <Menu products={products} categories={categories} />
      </section>
    </main>
  );
}
