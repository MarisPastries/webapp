'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import {
  BsChevronRight,
  BsChevronLeft,
  BsCircle,
  BsCircleFill,
} from 'react-icons/bs';

import { heroImages } from '@/constants';

const Hero = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // useEffect(() => {
  //   setInterval(() => {
  //     selectNewIndex(true);
  //   }, 5000);
  // }, [selectedIndex]);

  const selectNewIndex = (next: boolean) => {
    if (next) {
      const condition = selectedIndex === heroImages.length - 1;
      condition ? setSelectedIndex(0) : setSelectedIndex(selectedIndex + 1);
    } else {
      const condition = selectedIndex === 0;
      condition
        ? setSelectedIndex(heroImages.length - 1)
        : setSelectedIndex(selectedIndex - 1);
    }
  };

  const prevImage: React.MouseEventHandler<HTMLButtonElement> = () => {
    selectNewIndex(false);
  };

  const nextImage: React.MouseEventHandler<HTMLButtonElement> = () => {
    selectNewIndex(true);
  };

  return (
    <section className='relative flex justify-center max-w-[1540px] mx-auto'>
      <Image
        src={heroImages[selectedIndex].src}
        alt='hero image'
        width={500}
        height={500}
        className='w-screen h-[600px] object-cover md:hidden'
      />
      <Image
        src={heroImages[selectedIndex].src2}
        alt='hero image'
        width={1024}
        height={576}
        className='hidden w-screen h-[600px] object-cover md:flex 2xl:h-[800px]'
      />
      <BsChevronLeft
        className='text-[40px] rounded-full py-2 bg-secondary bg-opacity-50 text-light absolute z-10 top-[250px] left-[16px] md:top-[350px]'
        onClick={prevImage}
      >
        {'<'}
      </BsChevronLeft>
      <BsChevronRight
        className='text-[40px] rounded-full py-2 bg-secondary bg-opacity-50 text-light absolute z-10 top-[250px] right-[16px] md:top-[350px]'
        onClick={nextImage}
      >
        {'>'}
      </BsChevronRight>
      <p className='text-xl font-bold absolute bottom-[60px] drop-shadow-xl md:text-2xl bg-pink w-fit px-4 py-1 rounded-xl'>
        {heroImages[selectedIndex].name}
      </p>
      <div className='flex gap-3 absolute bottom-[20px] text-secondary font-bold md:text-xl'>
        {selectedIndex === 0 ? <BsCircleFill /> : <BsCircle />}
        {selectedIndex === 1 ? <BsCircleFill /> : <BsCircle />}
        {selectedIndex === 2 ? <BsCircleFill /> : <BsCircle />}
      </div>
    </section>
  );
};

export default Hero;
