import React, { useEffect, useState } from 'react';
import { Star, StarHalf, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';
import { useCountry } from '@/contexts/CountryContext';

const services = [
  'DRY CLEANING',
  'WASH AND FOLD',
  'IRONING',
  'SHOE CLEANING',
];

function useTypewriter(words, typingSpeed = 80, pause = 2000) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (typing && !deleting) {
      if (displayed.length < words[wordIndex].length) {
        // Typing the word
        timeout = setTimeout(() => {
          setDisplayed(words[wordIndex].slice(0, displayed.length + 1));
        }, typingSpeed);
      } else {
        // Word fully typed, wait before deleting
        timeout = setTimeout(() => {
          setDeleting(true);
        }, pause);
      }
    } else if (deleting) {
      if (displayed.length > 0) {
        // Deleting the word
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, typingSpeed / 2);
      } else {
        // Word fully deleted, move to next word
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, deleting, wordIndex, words, typingSpeed, pause]);

  return displayed;
}

const HeroSection = () => {
  const { currentCountry, getImageUrl } = useCountry();

  return <section className="flex flex-col items-center pb-24 px-6 md:px-12 lg:px-28 xl:px-32 w-full">
    <div className="max-w-7xl w-full">
      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-24 rounded-2xl p-6 md:p-10 bg-white overflow-hidden">
        {/* Animated, subtle background element */}
        <motion.div
          className="hidden lg:block absolute -top-16 -left-24 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#eaf3fb] to-[#b3d8fa] blur-3xl opacity-60 z-[-2]"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Line streaks gradient (decorative, not full background) */}
        <div className="hidden lg:block absolute top-0 left-1/4 w-1/2 h-full pointer-events-none z-[-1]" style={{background: 'repeating-linear-gradient(120deg, #eaf3fb 0px, #eaf3fb 2px, transparent 2px, transparent 24px)', opacity: 0.5, borderRadius: '2rem'}}></div>
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center items-center lg:items-start gap-3 w-full lg:w-1/2 text-center lg:text-left z-10"
        >
          {/* Animated Service Heading */}
          <div style={{ minWidth: '22ch', maxWidth: '22ch', display: 'inline-block' }} className="mb-2">
            <h1
              className="text-3xl md:text-5xl xl:text-6xl font-product-sans-black text-[#1869D3] leading-tight uppercase"
              style={{ width: '100%', whiteSpace: 'nowrap' }}
            >
              {useTypewriter(services) || '\u00A0'}
            </h1>
          </div>
          <h2 className="text-xl md:text-3xl xl:text-4xl font-bold text-[#0E0E0E] leading-snug mb-1">
            at your fingertips
          </h2>
          <p className="text-sm md:text-lg font-product-sans-light text-[#212121] capitalize mb-2 max-w-[280px] lg:max-w-none">
            "30-MINUTE PICKUP, SAME-DAY CLEAN & DELIVERY!"
          </p>
          {/* CTA Button */}
          <button className="bg-[#E8F1FD] border border-[#488FED] rounded-full flex items-center justify-between p-1 pl-6 w-full max-w-[280px] lg:max-w-[320px] shadow-md transition-all duration-200 hover:scale-105 hover:bg-[#1869D3] hover:text-white">
            <span className="flex items-center gap-3">
              <span className="flex flex-col">
                <span className="text-base font-medium text-[#0E0E0E] group-hover:text-white">Pickup</span>
                <span className="text-xs text-[#999999] group-hover:text-white">Tomorrow</span>
              </span>
              <span className="w-px h-8 bg-[#E9E9E9] mx-2"></span>
              <span className="flex flex-col">
                <span className="text-base font-medium text-[#0E0E0E] group-hover:text-white">Where</span>
                <span className="text-xs text-[#999999] group-hover:text-white">Add address</span>
              </span>
            </span>
            <span className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-[#1A73E8] to-[#1355A3] flex items-center justify-center text-white">
              <ArrowRight className="w-5 h-5" />
            </span>
          </button>
          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              <Star className="w-4 h-4 lg:w-5 lg:h-5 text-[#FFB400]" />
              <Star className="w-4 h-4 lg:w-5 lg:h-5 text-[#FFB400]" />
              <Star className="w-4 h-4 lg:w-5 lg:h-5 text-[#FFB400]" />
              <Star className="w-4 h-4 lg:w-5 lg:h-5 text-[#FFB400]" />
              <StarHalf className="w-4 h-4 lg:w-5 lg:h-5 text-[#FFB400]" />
            </div>
            <span className="text-sm lg:text-base text-[#171717]">4.8/5 G2 Rating</span>
          </div>
        </motion.div>
        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full lg:w-1/2 flex justify-center items-center z-10"
        >
          <img 
            src={getImageUrl("hero-phone-mockup.png")} 
            alt="Dry Cleaning App" 
            className="w-full max-w-[280px] md:max-w-[400px] lg:max-w-[420px] xl:max-w-[450px] 2xl:max-w-[500px] h-auto drop-shadow-lg"
            onError={(e) => {
              e.currentTarget.src = "/lovable-uploads/7d652b3e-f996-4aa4-978d-e311436d329f.png";
            }} 
          />
        </motion.div>
      </div>
      
      {/* Stats Section - Modified for better mobile alignment */}
      <div className="w-full overflow-hidden">
        <div className="flex justify-between items-center gap-4 py-8 mt-8 px-4 md:px-0 md:gap-20 lg:gap-32 min-w-[320px] max-w-[1200px] mx-auto">
          <div className="flex-1 min-w-[100px] text-center">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-product-sans-black bg-gradient-to-r from-[#5294FF] to-[#003E8F] bg-clip-text text-transparent whitespace-nowrap">
              10k+
            </h3>
            <p className="text-xs sm:text-sm md:text-base font-medium text-[#0E0E0E] mt-2 whitespace-nowrap">
              Items Dry Cleaned
            </p>
          </div>

          <div className="flex-1 min-w-[100px] text-center">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-product-sans-black bg-gradient-to-r from-[#5395FF] to-[#003E8F] bg-clip-text text-transparent whitespace-nowrap">
              100+
            </h3>
            <p className="text-xs sm:text-sm md:text-base font-medium text-[#0E0E0E] mt-2 whitespace-nowrap">
              Kgs Laundry
            </p>
          </div>

          <div className="flex-1 min-w-[100px] text-center">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-product-sans-black bg-gradient-to-r from-[#5294FF] to-[#003E8F] bg-clip-text text-transparent whitespace-nowrap">
              10k+
            </h3>
            <p className="text-xs sm:text-sm md:text-base font-medium text-[#0E0E0E] mt-2 whitespace-nowrap">
              Shirts Laundered
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>;
};
export default HeroSection;
