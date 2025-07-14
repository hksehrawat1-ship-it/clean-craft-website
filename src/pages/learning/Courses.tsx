import { useEffect } from 'react';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CourseInfo from '@/components/CourseInfo';
import TrainerSection from '@/components/TrainerSection';
import Testimonials from '@/components/shared/Testimonials';
import Curriculum from '@/components/Curriculum';
import Guarantees from '@/components/Guarantees';
import RegistrationForm from '@/components/RegistrationForm';
import FAQs from '@/components/shared/FAQs';
import { EnhancedSEO } from '@/components/EnhancedSEO';
import StudentGallery from '@/components/franchise/StudentGallery';

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

  // Handle scroll to registration form
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get('scrollTo');
    if (scrollTo === 'registration' || window.location.hash === '#registration') {
      setTimeout(() => {
        const registrationForm = document.getElementById('registration-form');
        if (registrationForm) {
          registrationForm.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);

  return (
    <>
      <EnhancedSEO 
        slug="/learning/courses"
        pageType="Course"
        customKeywords={['laundry training certification', 'professional cleaning education']}
      />
      <div className="min-h-screen flex flex-col bg-white">
        <EnhancedNavbar />
        <main className="flex-1">
          <div className="space-y-16 md:space-y-24">
            <HeroSection />
            <div className="fade-in-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CourseInfo />
            </div>
            <div className="fade-in-section bg-blue-50/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TrainerSection />
              </div>
            </div>
            <div className="fade-in-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Curriculum />
            </div>
            <div className="fade-in-section bg-blue-50/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Testimonials category="courses" />
              </div>
            </div>
            <div className="fade-in-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <StudentGallery />
            </div>
            <div className="fade-in-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Guarantees />
            </div>
            <div className="fade-in-section bg-primary/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RegistrationForm />
              </div>
            </div>
            <div className="fade-in-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FAQs category="courses" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Courses;
