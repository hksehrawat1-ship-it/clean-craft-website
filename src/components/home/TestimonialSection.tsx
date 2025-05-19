import React from 'react';
import { StrapiTestimonial } from '@/types/strapi';
import TestimonialDisplay from '../shared/TestimonialDisplay';

interface TestimonialSectionProps {
  testimonials: StrapiTestimonial[];
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  if (!testimonials?.length) {
    return null;
  }

  return <TestimonialDisplay testimonials={testimonials} variant="home" />;
};

export default TestimonialSection; 