
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CourseInfo from '@/components/CourseInfo';
import Curriculum from '@/components/Curriculum';
import Guarantees from '@/components/Guarantees';
import RegistrationForm from '@/components/RegistrationForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

const Index = () => {
  // Implement fade-in scroll animation
  useEffect(() => {
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      
      <div className="fade-in-section">
        <CourseInfo />
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
