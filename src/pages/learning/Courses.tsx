
import React, { useEffect } from 'react';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import { SEO } from '@/components/SEO';

const Courses = () => {
  useEffect(() => {
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '20px'
    });
    fadeInSections.forEach(section => {
      fadeInObserver.observe(section);
    });
    return () => {
      fadeInSections.forEach(section => {
        fadeInObserver.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    document.title = "Clean Craft - Professional Laundry Training in Delhi";
  }, []);

  useEffect(() => {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }
    return () => {};
  }, []);

  return (
    <>
      <SEO 
        slug="learning/courses"
        defaultTitle="Professional Laundry Training in Delhi | CleanCraft"
        defaultDescription="Join our comprehensive laundry training program in Delhi. Learn from industry experts and start your successful laundry business."
      />
      <div className="min-h-screen flex flex-col bg-white">
        <EnhancedNavbar />
        <main className="flex-1">
          <div className="space-y-16 md:space-y-24">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 md:py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                    Professional Laundry Training
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Learn from industry experts and start your successful laundry business
                  </p>
                  <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
                    <span className="text-sm font-medium text-gray-700">Next batch starts soon</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Course Information */}
            <section className="fade-in-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Information</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Comprehensive training program designed to help you master the laundry business
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Duration</h3>
                  <p className="text-gray-600">5-day intensive training program</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Location</h3>
                  <p className="text-gray-600">Delhi, India</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Certificate</h3>
                  <p className="text-gray-600">Professional completion certificate</p>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <div className="fade-in-section bg-blue-50/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Testimonials />
              </div>
            </div>

            {/* FAQ */}
            <div className="fade-in-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Common questions about our training program
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">What is included in the training?</h3>
                    <p className="text-gray-600">Complete business setup guidance, equipment knowledge, and operational training.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Do I need prior experience?</h3>
                    <p className="text-gray-600">No prior experience required. We start from basics and build up your knowledge.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">What support do I get after training?</h3>
                    <p className="text-gray-600">Ongoing support and consultation for business setup and operations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Courses;
