
import React from 'react';
import Navbar from '../../components/Navbar';
import OfferCarousel from './OfferCarousel';
import Footer from '../../components/home/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <OfferCarousel />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
