import { Footer, Navbar } from '@/components';
import './globals.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';

const lato = Lato({ weight: ['100', '300', '400', '700', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Mari's Pastries",
  description: "Mari's Pastries Tienda Online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <body className={`${lato.className} bg-light text-dark overflow-x-hidden`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
