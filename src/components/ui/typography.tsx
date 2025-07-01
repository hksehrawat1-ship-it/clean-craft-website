
import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

// Display headings - for hero sections and main page titles
export const DisplayHeading: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  as: Component = 'h1' 
}) => (
  <Component 
    className={cn(
      'text-display-sm md:text-display-md lg:text-display-lg',
      'text-gray-900 font-display tracking-widest uppercase',
      className
    )}
  >
    {children}
  </Component>
);

// Section headings - for major sections
export const SectionHeading: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  as: Component = 'h2' 
}) => (
  <Component 
    className={cn(
      'text-heading-sm md:text-heading-md lg:text-heading-lg',
      'text-gray-900 font-display tracking-wider uppercase',
      className
    )}
  >
    {children}
  </Component>
);

// Subsection headings - for cards and components
export const SubsectionHeading: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  as: Component = 'h3' 
}) => (
  <Component 
    className={cn(
      'text-title-sm md:text-title-md lg:text-title-lg',
      'text-gray-900 font-display tracking-wide uppercase',
      className
    )}
  >
    {children}
  </Component>
);

// Body text - for paragraphs and content
export const BodyText: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  as: Component = 'p' 
}) => (
  <Component 
    className={cn(
      'text-body-sm md:text-body-md lg:text-body-lg',
      'text-gray-600 leading-relaxed',
      className
    )}
  >
    {children}
  </Component>
);

// Small text - for captions and metadata
export const Caption: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  as: Component = 'span' 
}) => (
  <Component 
    className={cn(
      'text-caption',
      'text-gray-500',
      className
    )}
  >
    {children}
  </Component>
);

// Overline text - for section labels
export const Overline: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  as: Component = 'span' 
}) => (
  <Component 
    className={cn(
      'text-overline',
      'text-brand-blue font-medium tracking-widest uppercase',
      className
    )}
  >
    {children}
  </Component>
);
