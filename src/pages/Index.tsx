
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CourseInfo from '@/components/CourseInfo';
import TrainerSection from '@/components/TrainerSection';
import Testimonials from '@/components/Testimonials';
import Curriculum from '@/components/Curriculum';
import Guarantees from '@/components/Guarantees';
import RegistrationForm from '@/components/RegistrationForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

const Index = () => {
  // Implement fade-in scroll animation with improved mobile performance
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
      rootMargin: '20px' // Add margin to trigger animations a bit earlier for mobile
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

  // Update document title
  useEffect(() => {
    document.title = "Clean Craft - Professional Laundry Training in Delhi";
  }, []);

  // Set viewport for mobile optimization
  useEffect(() => {
    // Ensure proper viewport settings for mobile
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }
    
    return () => {
      // No cleanup needed
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      
      <div className="fade-in-section">
        <CourseInfo />
      </div>
      
      <div className="fade-in-section">
        <TrainerSection />
      </div>
      
      <div className="fade-in-section">
        <Testimonials />
      </div>
      
      <div className="fade-in-section">
        <Curriculum />
      </div>
      
      <div className="fade-in-section">
        <Guarantees />
      </div>
      
      <div className="fade-in-section">
        <RegistrationForm />
      </div>
      
      <div className="fade-in-section">
        <FAQ />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
