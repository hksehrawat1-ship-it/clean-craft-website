
import React from "react";
import { TrendingUp, Users, BookOpen } from "lucide-react";

const EnhancedBlogHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-300/15 rounded-full animate-bounce"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <TrendingUp className="h-4 w-4 text-blue-200" />
            <span className="text-blue-100 text-sm font-medium tracking-wide uppercase">Latest Industry Insights</span>
          </div>

          {/* Main Heading */}
          <h1 className="heading-primary text-white mb-6 leading-tight">
            <span className="block">Laundry & Dry Cleaning</span>
            <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              Expert Insights
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-10 leading-relaxed">
            Professional tips, industry trends, and expert advice for garment care, 
            cleaning techniques, and franchise growth opportunities.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-4">
                <BookOpen className="h-6 w-6 text-blue-200" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">150+</div>
              <div className="text-blue-200 text-sm tracking-wide uppercase">Expert Articles</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-4">
                <Users className="h-6 w-6 text-blue-200" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">10K+</div>
              <div className="text-blue-200 text-sm tracking-wide uppercase">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-4">
                <TrendingUp className="h-6 w-6 text-blue-200" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">Weekly</div>
              <div className="text-blue-200 text-sm tracking-wide uppercase">New Content</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedBlogHero;
