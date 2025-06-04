
import React from "react";
import BookHero from "@/components/book/Hero";
import BookFeatures from "@/components/book/Features";
import BookBenefits from "@/components/book/Benefits";
import BookAuthor from "@/components/book/Author";
import BookTestimonials from "@/components/book/Testimonials";
import BookGuarantee from "@/components/book/Guarantee";
import BookFaq from "@/components/book/Faq";
import BookCta from "@/components/book/Cta";
import BookOffer from "@/components/book/Offer";
import BookBestSeller from "@/components/book/BestSeller";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import Layout from "@/components/home/Layout";

const Book = () => {
  return (
    <Layout>
      <EnhancedSEO
        slug="learning/book"
        pageType="Book"
        defaultTitle="Spotless Profit in Laundry - Business Guide Book | CleanCraft"
        defaultDescription="Complete business guide for starting dry cleaning, wet cleaning, and laundry services. Learn garment care techniques, business strategies, and profit optimization."
        customKeywords={['dry cleaning business guide', 'wet cleaning startup manual', 'garment care industry book', 'cleaning business strategies']}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <BookHero />
        <BookBestSeller />
        <BookFeatures />
        <BookBenefits />
        <BookAuthor />
        <BookTestimonials />
        <BookOffer />
        <BookGuarantee />
        <BookFaq />
        <BookCta />
      </div>
    </Layout>
  );
};

export default Book;
