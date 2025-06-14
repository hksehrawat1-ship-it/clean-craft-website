import React from 'react';
import EnhancedNavbar from '../../components/EnhancedNavbar';
// import OfferCarousel from './OfferCarousel';
import Footer from '../../components/Footer'; // Using the more branded Footer

interface LayoutProps {
  children: React.ReactNode;
  showOfferCarousel?: boolean;
}

const Layout = ({ children, showOfferCarousel = true }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <EnhancedNavbar />
      <div>
        {/* {showOfferCarousel && <OfferCarousel />} */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
