import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  BsFacebook,
  BsInstagram,
  BsWhatsapp,
  BsTiktok,
  BsFillPinMapFill,
  BsEnvelope,
  BsFillTelephoneFill,
} from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className='bg-pink-light py-10 px-6 flex flex-col items-center'>
      <div className='w-full max-w-[1000px] flex flex-col items-center justify-center gap-10 md:flex-row md:justify-between md:mb-10'>
        {/* Logo y Social Media */}
        <div className='flex flex-col items-center gap-6'>
          <Link href='/'>
            <Image
              src='/logo.png'
              alt='logo'
              width={80}
              height={80}
              className='object-contain md:w-[100px] md:h-[100px]'
            />
          </Link>
          <div className='flex text-primary text-2xl gap-10'>
            <Link href='https://www.facebook.com/marispastriess'>
              <BsFacebook />
            </Link>
            <Link href='https://www.instagram.com/marispastries_/'>
              <BsInstagram />
            </Link>
            <Link href='https://www.tiktok.com/@marispastries_'>
              <BsTiktok />
            </Link>
            <Link href='https://api.whatsapp.com/send?phone=584249605447'>
              <BsWhatsapp />
            </Link>
          </div>
        </div>

        {/* Navegacion */}
        <nav className='flex flex-col gap-5 text-primary items-center text-lg'>
          <Link href='/'>Inicio</Link>
          <Link href='/menu'>Menú</Link>
          <Link href='/acerca'>Acerca de</Link>
        </nav>

        {/* Datos de Contacto */}
        <div className='flex flex-col gap-2 mb-6 md:mb-0'>
          <h4 className='text-lg font-bold mb-2'>Contacto</h4>
          <p className='flex gap-2 items-center'>
            <span>
              <BsFillPinMapFill />
            </span>
            Puerto Ordaz, Venezuela.
          </p>
          <p className='flex gap-2 items-center'>
            <span>
              <BsEnvelope />
            </span>
            maris.pastry20@gmail.com
          </p>
          <p className='flex gap-2 items-center'>
            <span>
              <BsFillTelephoneFill />
            </span>
            +58 424 - 960 5447
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className='w-screen pt-8 h-[80px] flex justify-center items-center border-t border-t-pink'>
        <p className='text-xs md:text-sm'>
          Mari{"'"}s Pastries © 2021 - 2024 Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
