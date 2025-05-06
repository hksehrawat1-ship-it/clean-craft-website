import React from 'react';
import Header from '../../components/Header';
import Hero from '../../components/book/Hero';
import BestSeller from '../../components/book/BestSeller';
import Benefits from '../../components/book/Benefits';
import Author from '../../components/book/Author';
import Testimonials from '../../components/book/Testimonials';
import Guarantee from '../../components/book/Guarantee';
import Faq from '../../components/book/Faq';
import Offer from '../../components/book/Offer';
import Footer from '../../components/Footer';

const Book = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <BestSeller />
      <Benefits />
      <Author />
      <Testimonials />
      <Guarantee />
      <Faq />
      <Offer />
      <Footer />
    </div>
  );
};

export default Book;
