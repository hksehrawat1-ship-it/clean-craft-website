
import React from 'react';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import Hero from '@/components/book/Hero';
import BestSeller from '@/components/book/BestSeller';
import Benefits from '@/components/book/Benefits';
import Author from '@/components/book/Author';
import Testimonials from '@/components/Testimonials';
import Guarantee from '@/components/book/Guarantee';
import Faq from '@/components/book/Faq';
import Offer from '@/components/book/Offer';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';

const Book = () => {
  return (
    <>
      <SEO 
        slug="learning/book"
        defaultTitle="Laundry Business Guide Book | CleanCraft"
        defaultDescription="Get the complete guide on how to start and run a successful laundry business in India. Expert insights and proven strategies."
      />
      <div className="min-h-screen flex flex-col bg-white">
        <EnhancedNavbar />
        <main className="flex-1">
          <div className="space-y-16 md:space-y-24">
            <Hero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <BestSeller />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Benefits />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Author />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Testimonials />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Guarantee />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Faq />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Offer />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Book;
