import Image from 'next/image';
import React from 'react';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  buttonText: string;
}

const ProductCard = ({ title, price, image, buttonText }: ProductCardProps) => {
  return (
    <div className='mx-auto bg-pink-light w-[300px] h-[440px] rounded-xl px-5 py-5 flex flex-col justify-between shadow-lg mb-8'>
      <Image
        src={image}
        alt={title}
        width={280}
        height={280}
        className='rounded-xl'
      />
      <h3 className='text-lg text-center -mt-12 font-bold'>{title}</h3>
      <div className='flex justify-between'>
        <p className='text-lg'>${price}</p>

        <button className='bg-secondary text-light px-6 py-2 rounded-full'>{buttonText}</button>
      </div>
    </div>
  );
};

export default ProductCard;
