
import React from 'react';

const BlogHero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Laundry & Cleaning
            <span className="text-primary block mt-2">Tips & Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice on dry cleaning, wet cleaning, and garment care. 
            Stay updated with the latest industry insights and professional tips.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
