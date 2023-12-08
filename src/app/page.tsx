import { ProductCard } from '@/components';
import { Product } from '@/types';
import getData from '@/utils/getProducts';



export default async function Home() {
  const products: Product[] = await getData();


  return (
    <main>
      <h1 className='text-red-400 font-extrabold text-5xl text-center my-12'>
        Mari's Pastries, coming soon...
      </h1>
      <section className='p-4 h-auto w-full flex flex-wrap gap-6'>

      {products.map((product) => (
        <ProductCard
        title={product.title}
        price={product.prices[0]}
        image={product.imageUrl[0]}
        buttonText='Saber más...'
        />
        ))}
        </section>
    </main>
  );
}
