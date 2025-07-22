import BookHero from "@/components/book/Hero";
import BookFeatures from "@/components/book/Features";
import BookBenefits from "@/components/book/Benefits";
import BookAuthor from "@/components/book/Author";
import BookGuarantee from "@/components/book/Guarantee";
import BookOffer from "@/components/book/Offer";
import BookBestSeller from "@/components/book/BestSeller";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import Layout from "@/components/home/Layout";
import Testimonials from "@/components/shared/Testimonials";
import FAQs from "@/components/shared/FAQs";

const Book = () => {
  return (
    <Layout>
      <EnhancedSEO
        slug="/learning/laundry-training-book"
        pageType="Book"
        customKeywords={[
          "spotless profit laundry",
          "laundry business ebook",
          "cleaning industry guide",
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <BookHero />
        <BookBestSeller />
        <BookFeatures />
        <BookBenefits />
        <BookAuthor />
        <div className="bg-blue-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Testimonials category="book" />
          </div>
        </div>
        <BookOffer />
        <BookGuarantee />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQs category="book" />
        </div>
      </div>
    </Layout>
  );
};

export default Book;
