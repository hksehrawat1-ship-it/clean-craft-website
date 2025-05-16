import React, { useEffect } from 'react';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CourseInfo from '@/components/CourseInfo';
import TrainerSection from '@/components/TrainerSection';
import Testimonials from '@/components/Testimonials';
import Curriculum from '@/components/Curriculum';
import Guarantees from '@/components/Guarantees';
import RegistrationForm from '@/components/RegistrationForm';
import FAQ from '@/components/FAQ';
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
      <EnhancedNavbar />
      <main className="flex-1">
        <div className="space-y-16 md:space-y-24">
          <HeroSection />
          <div className="fade-in-section">
            <CourseInfo />
          </div>
          <div className="fade-in-section bg-blue-50/30">
            <TrainerSection />
          </div>
          <div className="fade-in-section">
            <Curriculum />
          </div>
          <div className="fade-in-section bg-blue-50/30">
            <Testimonials />
          </div>
          <div className="fade-in-section">
            <Guarantees />
          </div>
          <div className="fade-in-section bg-primary/5">
            <RegistrationForm />
          </div>
          <div className="fade-in-section">
            <FAQ />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Courses; 