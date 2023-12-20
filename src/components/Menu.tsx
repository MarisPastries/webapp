'use client';

import { Category, Product } from '@/types';
import React, { useState } from 'react';
import { ProductCard } from '.';

interface MenuProps {
  products: Product[];
  categories: Category[];
}

const Menu = ({ products, categories }: MenuProps) => {
  const [category, setCategory] = useState<string | null>('');

  const productsByCategory = products.filter(
    (product) => product.category.name === category,
  );

  const handleCategoryFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setCategory(value);
  };

  return (
    <div className='pb-10'>
      <div className='flex flex-wrap mb-12 justify-center gap-6'>
        <button
          onClick={handleCategoryFilter}
          className='text-sm bg-pink-light px-4 py-1 rounded-full hover:bg-pink md:text-base'
          type='button'
          value='Todos'
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            onClick={handleCategoryFilter}
            key={category.id}
            className='text-sm bg-pink-light px-4 py-1 rounded-full hover:bg-pink md:text-base'
            type='button'
            value={category.name}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className='flex flex-wrap'>
        {category ? (
          productsByCategory.length === 0 ? (
            category === 'Todos' ? (
              products.map((product) => (
                <ProductCard
                  title={product.title || 'prueba'}
                  price={product.prices[0] || 0}
                  image={product.imageUrl[0] || ''}
                  key={product.id || 'iaskxhjkashx'}
                  buttonText='Saber más...'
                />
              ))
            ) : (
              <p className='mx-auto my-40 font-bold md:my-60'>
                Ups, no se han encontrado productos {':('}
              </p>
            )
          ) : (
            productsByCategory.map((product) => (
              <ProductCard
                title={product.title || 'prueba'}
                price={product.prices[0] || 0}
                image={product.imageUrl[0] || ''}
                key={product.id || 'iaskxhjkashx'}
                buttonText='Saber más...'
              />
            ))
          )
        ) : (
          products.map((product) => (
            <ProductCard
              title={product.title || 'prueba'}
              price={product.prices[0] || 0}
              image={product.imageUrl[0] || ''}
              key={product.id || 'iaskxhjkashx'}
              buttonText='Saber más...'
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;
