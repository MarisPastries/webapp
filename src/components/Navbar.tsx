'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BsList, BsX } from 'react-icons/bs';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='bg-pink min-h-[80px] w-screen px-8 md:px-12 lg:px-24 flex justify-center items-center'>
      <div className='min-h-[80px] w-full max-w-[1280px] flex justify-between items-center'>
        <Link href='/'>
          <Image
            src='/logo.png'
            alt='logo'
            width={60}
            height={60}
            className='object-contain'
          />
        </Link>
        <nav className='hidden sm:flex gap-12'>
          <Link href='/' className='hover:text-red-800'>
            Inicio
          </Link>
          <Link href='/menu' className='hover:text-red-800'>
            Menú
          </Link>
          <Link href='/acerca' className='hover:text-red-800'>
            Acerca de
          </Link>
        </nav>
      </div>

      <div className='flex sm:hidden'>
        {!isOpen && <BsList className='text-[24px]' onClick={handleClick} />}
        {isOpen && <BsX className='text-[32px]' onClick={handleClick} />}
      </div>

      {isOpen && (
        <nav className='sm:hidden flex flex-col w-full h-full items-center justify-center gap-16 text-2xl absolute top-0 left-0 bg-pink-light bg-opacity-50 backdrop-blur-md z-20'>
          <BsX
            className='text-[32px] absolute top-6 right-6'
            onClick={handleClick}
          />
          <Link href='/' onClick={handleClick}>
            Inicio
          </Link>
          <Link href='/menu' onClick={handleClick}>
            Menú
          </Link>
          <Link href='/acerca' onClick={handleClick}>
            Acerca de
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
