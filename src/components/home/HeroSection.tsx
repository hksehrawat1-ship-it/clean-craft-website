import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import RevolvingIcons from "./RevolvingIcons";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Trusted from "./Trusted";

const services = ["DRY CLEANING", "WASH AND FOLD", "IRONING", "SHOE CLEANING"];

function useTypewriter(words: string[], typingSpeed = 80, pause = 2000) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (typing && !deleting) {
      if (displayed.length < words[wordIndex].length) {
        timeout = setTimeout(() => {
          setDisplayed(words[wordIndex].slice(0, displayed.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setDeleting(true);
        }, pause);
      }
    } else if (deleting) {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, typingSpeed / 2);
      } else {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, deleting, wordIndex, words, typingSpeed, pause]);

  return displayed;
}

const HeroSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathCountry = location.pathname.split("/")[1].toLowerCase(); // 'in', 'au', etc.
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    const loop = setInterval(() => {
      setShowBanner(true);
      hideTimeout = setTimeout(() => {
        setShowBanner(false);
      }, 5000);
    }, 7000);

    return () => {
      clearInterval(loop);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center pb-0 md:pb-20 px-6 md:px-12 lg:px-28 xl:px-32 xl:pt-0 w-full">
      <div className="max-w-7xl w-full">
        <div className="relative flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16 xl:gap-24 rounded-2xl p-6 md:p-10 bg-white overflow-hidden min-h-[500px]">
          {showBanner && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-4 hidden left-6 bg-[#FFF5F0] text-[#FF3D00] px-4 py-1 rounded-full shadow-md text-sm md:text-base font-semibold z-20"
            >
              🎉 Get 20% off on your first order
            </motion.div>
          )}

          {/* Background Glow */}
          <motion.div
            className="hidden lg:block absolute -top-16 -left-24 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#eaf3fb] to-[#b3d8fa] blur-3xl opacity-60 z-[-2]"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="hidden lg:block absolute top-0 left-1/4 w-1/2 h-full pointer-events-none z-[-1]"
            style={{
              background:
                "repeating-linear-gradient(120deg, #eaf3fb 0px, #eaf3fb 2px, transparent 2px, transparent 24px)",
              opacity: 0.5,
              borderRadius: "2rem",
            }}
          ></div>

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center items-center lg:items-start gap-3 w-full lg:w-1/2 text-center lg:text-left z-10 h-full"
          >
            <h1 className="text-3xl md:text-5xl xl:text-6xl font-product-sans-black text-[#1869D3] leading-tight uppercase whitespace-nowrap mb-0 max:mb-4">
              {useTypewriter(services) || "\u00A0"}
            </h1>

            <h2 className="text-xl md:text-3xl xl:text-4xl font-bold text-[#0E0E0E] leading-snug mb-0 max:mb-4">
              at your fingertips
            </h2>
            <p className="text-sm md:text-lg font-product-sans-light text-[#212121] capitalize mb-2 mx:mb-4 max-w-[280px] lg:max-w-none ">
              We wash. We press. We impress <br /> Book your clean slot today
            </p>

            {/* 🔽 Booking Button with Navigation 🔽 */}
            <button
              onClick={() => navigate(`/${pathCountry}/book`)}
              className="bg-[#E8F1FD] border border-[#488FED] rounded-full flex items-center justify-between p-1 pl-6 w-full max-w-[280px] lg:max-w-[320px] shadow-md transition-all duration-200 hover:scale-105 hover:bg-[#1869D3] hover:text-white mb-4"
            >
              <span className="flex items-center gap-3">
                <span className="flex flex-col">
                  <span className="text-base font-medium text-[#0E0E0E]">
                    Pickup
                  </span>
                  <span className="text-xs text-[#999999]">Tomorrow</span>
                </span>
                <span className="w-px h-8 bg-[#E9E9E9] mx-2"></span>
                <span className="flex flex-col">
                  <span className="text-base font-medium text-[#0E0E0E]">
                    Where
                  </span>
                  <span className="text-xs text-[#999999]">Add address</span>
                </span>
              </span>
              <span className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-[#1A73E8] to-[#1355A3] flex items-center justify-center text-white">
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>

            <div className="flex items-center gap-2 mt-2 text-[#FFB400]">
              <div className="flex">
                <FaStar className="w-4 h-4 lg:w-5 lg:h-5" />
                <FaStar className="w-4 h-4 lg:w-5 lg:h-5" />
                <FaStar className="w-4 h-4 lg:w-5 lg:h-5" />
                <FaStar className="w-4 h-4 lg:w-5 lg:h-5" />
                <FaStarHalfAlt className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              <span className="text-sm lg:text-base text-[#171717]">
                4.8/5 G2 Rating
              </span>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center z-10 h-full"
          >
            <div className="my-auto">
              <RevolvingIcons />
              <img
                src={
                  pathCountry === "in"
                    ? "/lovable-uploads/Hero-India-removebg-preview.png"
                    : "/lovable-uploads/hero.png"
                }
                alt={`Laundry and Dry Cleaning - ${
                  pathCountry === "in" ? "India" : "Other Country"
                }`}
                className="mx-auto lg:mx-0 w-auto h-auto max-w-[280px] drop-shadow-lg relative z-10"
                style={{ maxHeight: "60vh" }}
                onError={(e) => {
                  e.currentTarget.src = "/lovable-uploads/hero.png";
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <div>
          <Trusted />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
