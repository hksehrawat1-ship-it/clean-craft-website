
import React from 'react';
import EnhancedNavbar from '../../components/EnhancedNavbar';
import OfferCarousel from './OfferCarousel';
import Footer from '../../components/home/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <EnhancedNavbar />
      <OfferCarousel />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
