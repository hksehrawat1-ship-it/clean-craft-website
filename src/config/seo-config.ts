
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  structuredData?: any;
}

export interface CountryPageSEO {
  [key: string]: { // page slug
    [key: string]: SEOConfig; // country code
  };
}

export const countryPageSEO: CountryPageSEO = {
  '/': {
    'in': {
      title: 'Professional Dry Cleaning & Wet Cleaning Services in India | CleanCraft',
      description: 'Premium dry cleaning, wet cleaning, and laundry services across India. Expert garment care, stain removal, and fabric preservation with eco-friendly cleaning solutions.',
      keywords: [
        'dry cleaning services india',
        'wet cleaning laundry',
        'professional garment care',
        'fabric cleaning india',
        'delicate clothing care',
        'stain removal services',
        'garment preservation',
        'eco-friendly dry cleaning',
        'premium fabric care india',
        'laundry services near me'
      ]
    },
    'au': {
      title: 'Premium Dry Cleaning & Wet Cleaning Services Australia | CleanCraft',
      description: 'Professional dry cleaning, wet cleaning, and garment care services across Australia. Expert fabric treatment in Melbourne, Sydney, Brisbane with sustainable cleaning methods.',
      keywords: [
        'dry cleaning australia',
        'wet cleaning services melbourne sydney',
        'professional garment care australia',
        'eco-friendly dry cleaning',
        'green wet cleaning',
        'sustainable fabric care',
        'premium dry cleaning melbourne',
        'organic wet cleaning sydney',
        'luxury garment care australia',
        'commercial laundry services'
      ]
    }
  },
  'learning/courses': {
    'in': {
      title: 'Professional Dry Cleaning & Wet Cleaning Training Course in Delhi | CleanCraft Institute',
      description: 'Learn professional dry cleaning techniques, wet cleaning methods, and garment care from industry experts. Comprehensive laundry business training in Delhi with hands-on experience.',
      keywords: [
        'dry cleaning training course',
        'wet cleaning techniques training',
        'garment care education',
        'professional cleaning certification',
        'fabric treatment course',
        'stain removal training',
        'laundry business training delhi',
        'dry cleaning institute india',
        'wet cleaning workshop india',
        'cleaning entrepreneur course'
      ]
    }
  },
  'learning/book': {
    'in': {
      title: 'Spotless Profit in Laundry - Dry Cleaning & Wet Cleaning Business Guide | CleanCraft',
      description: 'Complete business guide for starting dry cleaning, wet cleaning, and laundry services. Learn garment care techniques, business strategies, and profit optimization methods.',
      keywords: [
        'dry cleaning business guide',
        'wet cleaning startup manual',
        'garment care industry book',
        'cleaning business strategies',
        'fabric care entrepreneurship',
        'professional cleaning guide',
        'laundry business book india',
        'dry cleaning profit guide',
        'wet cleaning business plan',
        'spotless profit laundry'
      ]
    }
  },
  'franchise': {
    'in': {
      title: 'Dry Cleaning & Wet Cleaning Franchise Opportunity in India | CleanCraft Franchise',
      description: 'Join India\'s leading dry cleaning and wet cleaning franchise. Profitable garment care business opportunity with comprehensive training, equipment, and ongoing support.',
      keywords: [
        'dry cleaning franchise india',
        'wet cleaning business opportunity',
        'garment care franchise',
        'cleaning services franchise',
        'fabric care business model',
        'professional cleaning chain',
        'laundry franchise opportunity',
        'dry cleaning investment',
        'wet cleaning franchise cost',
        'profitable cleaning business'
      ]
    }
  },
  'services': {
    'in': {
      title: 'Complete Dry Cleaning & Wet Cleaning Services | CleanCraft India',
      description: 'Comprehensive dry cleaning, wet cleaning, and specialized garment care services. Expert fabric treatment, stain removal, and preservation with modern cleaning technology.',
      keywords: [
        'dry cleaning services',
        'wet cleaning solutions',
        'professional garment care',
        'fabric cleaning specialists',
        'stain removal experts',
        'delicate fabric care',
        'eco-friendly cleaning',
        'garment preservation',
        'commercial cleaning services',
        'specialized fabric treatment'
      ]
    },
    'au': {
      title: 'Professional Dry Cleaning & Wet Cleaning Services | CleanCraft Australia',
      description: 'Expert dry cleaning, wet cleaning, and garment care services across Australia. Sustainable cleaning solutions for delicate fabrics, formal wear, and specialty items.',
      keywords: [
        'dry cleaning australia',
        'wet cleaning services',
        'professional garment care',
        'sustainable cleaning solutions',
        'fabric specialists australia',
        'eco-friendly dry cleaning',
        'premium cleaning services',
        'garment restoration',
        'commercial fabric care',
        'luxury item cleaning'
      ]
    }
  }
};

export const getPageSEO = (slug: string, countryCode: string): SEOConfig | null => {
  const pageConfig = countryPageSEO[slug];
  if (!pageConfig) return null;
  
  const countryConfig = pageConfig[countryCode.toLowerCase()];
  return countryConfig || null;
};

export const generateStructuredData = (
  type: 'LocalBusiness' | 'Course' | 'Book' | 'Organization',
  countryCode: string,
  pageData?: any
) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type
  };

  switch (type) {
    case 'LocalBusiness':
      return {
        ...baseData,
        "name": "CleanCraft",
        "image": "https://cleancraft.com/logo.png",
        "description": "Professional dry cleaning, wet cleaning, and garment care services",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": countryCode.toUpperCase() === 'IN' ? 'India' : 'Australia'
        },
        "telephone": countryCode.toUpperCase() === 'IN' ? '+91-XXXXXXXXXX' : '+61-XXXXXXXXXX',
        "url": `https://cleancraft.com/${countryCode}`,
        "serviceType": ["Dry Cleaning", "Wet Cleaning", "Garment Care", "Stain Removal", "Fabric Preservation"]
      };

    case 'Course':
      return {
        ...baseData,
        "name": "Professional Dry Cleaning & Wet Cleaning Training",
        "description": "Comprehensive training in dry cleaning techniques, wet cleaning methods, and garment care",
        "provider": {
          "@type": "Organization",
          "name": "CleanCraft Institute"
        },
        "courseMode": "In-person",
        "educationalLevel": "Professional"
      };

    case 'Book':
      return {
        ...baseData,
        "name": "Spotless Profit in Laundry",
        "author": {
          "@type": "Person",
          "name": "Mr. Himanshu Sehrawat"
        },
        "description": "Complete guide to starting and running a successful dry cleaning and wet cleaning business",
        "genre": "Business Guide"
      };

    case 'Organization':
      return {
        ...baseData,
        "name": "CleanCraft",
        "description": "Leading provider of dry cleaning, wet cleaning, and garment care services",
        "url": `https://cleancraft.com/${countryCode}`,
        "logo": "https://cleancraft.com/logo.png",
        "serviceType": ["Dry Cleaning", "Wet Cleaning", "Laundry Services", "Garment Care"]
      };

    default:
      return baseData;
  }
};
