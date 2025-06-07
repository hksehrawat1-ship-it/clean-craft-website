
import React from "react";
import { motion } from "framer-motion";

const RevolvingIcons = () => {
  const icons = [
    {
      src: "/icons/Dry Cleaning-01.png",
      alt: "Dry Cleaning",
      angle: 0, // Top
      scale: 1,
    },
    {
      src: "/icons/Premium laundry.png", 
      alt: "Premium Laundry",
      angle: 90, // Right
      scale: 1.1,
    },
    {
      src: "/icons/Iron copy.png",
      alt: "Ironing",
      angle: 180, // Bottom
      scale: 0.9,
    },
    {
      src: "/icons/shoes-sets_755745-1286-01.png",
      alt: "Shoe Cleaning",
      angle: 270, // Left
      scale: 1.05,
    },
  ];

  // Responsive orbit calculations that follow the hero phone image
  const getOrbitDimensions = () => {
    if (typeof window === 'undefined') return { radiusX: 100, radiusY: 120 };
    
    const width = window.innerWidth;
    if (width < 640) { // mobile
      return { radiusX: 90, radiusY: 110 };
    } else if (width < 1024) { // tablet
      return { radiusX: 110, radiusY: 130 };
    } else { // desktop
      return { radiusX: 140, radiusY: 160 };
    }
  };

  const { radiusX, radiusY } = getOrbitDimensions();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Center point positioned relative to the hero phone image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Main orbital path - elliptical to match phone shape */}
        <motion.div
          className="absolute border-2 border-dotted border-blue-300/60 rounded-full"
          style={{
            width: radiusX * 2,
            height: radiusY * 2,
            left: -radiusX,
            top: -radiusY,
            borderRadius: '50%',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            rotate: 360 
          }}
          transition={{
            scale: { duration: 0.8, ease: "easeOut" },
            opacity: { duration: 0.8, ease: "easeOut" },
            rotate: { 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear",
              delay: 0.8
            }
          }}
        />
        
        {/* Secondary flowing dotted lines - adjusted for phone shape */}
        <motion.div
          className="absolute border border-dotted border-blue-200/40 rounded-full"
          style={{
            width: (radiusX + 20) * 2,
            height: (radiusY + 20) * 2,
            left: -(radiusX + 20),
            top: -(radiusY + 20),
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            rotate: -360 
          }}
          transition={{
            scale: { duration: 0.8, ease: "easeOut", delay: 0.3 },
            opacity: { duration: 0.8, ease: "easeOut", delay: 0.3 },
            rotate: { 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear",
              delay: 1.1
            }
          }}
        />
        
        <motion.div
          className="absolute border border-dotted border-blue-100/30 rounded-full"
          style={{
            width: (radiusX - 20) * 2,
            height: (radiusY - 20) * 2,
            left: -(radiusX - 20),
            top: -(radiusY - 20),
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            rotate: 360 
          }}
          transition={{
            scale: { duration: 0.8, ease: "easeOut", delay: 0.6 },
            opacity: { duration: 0.8, ease: "easeOut", delay: 0.6 },
            rotate: { 
              duration: 35, 
              repeat: Infinity, 
              ease: "linear",
              delay: 1.4
            }
          }}
        />

        {/* Revolving Icons with elliptical orbital motion around phone shape */}
        {icons.map((icon, index) => {
          const emergDelay = 1.5 + index * 0.3;
          
          return (
            <motion.div
              key={index}
              className="absolute w-8 h-8 md:w-12 md:h-12"
              style={{
                left: -16,
                top: -16,
              }}
              initial={{ 
                scale: 0, 
                opacity: 0,
                x: Math.cos((icon.angle * Math.PI) / 180) * radiusX,
                y: Math.sin((icon.angle * Math.PI) / 180) * radiusY,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                x: [
                  Math.cos((icon.angle * Math.PI) / 180) * radiusX,
                  Math.cos(((icon.angle + 90) * Math.PI) / 180) * radiusX,
                  Math.cos(((icon.angle + 180) * Math.PI) / 180) * radiusX,
                  Math.cos(((icon.angle + 270) * Math.PI) / 180) * radiusX,
                  Math.cos((icon.angle * Math.PI) / 180) * radiusX,
                ],
                y: [
                  Math.sin((icon.angle * Math.PI) / 180) * radiusY,
                  Math.sin(((icon.angle + 90) * Math.PI) / 180) * radiusY,
                  Math.sin(((icon.angle + 180) * Math.PI) / 180) * radiusY,
                  Math.sin(((icon.angle + 270) * Math.PI) / 180) * radiusY,
                  Math.sin((icon.angle * Math.PI) / 180) * radiusY,
                ],
              }}
              transition={{
                scale: { 
                  duration: 0.6, 
                  ease: "backOut", 
                  delay: emergDelay 
                },
                opacity: { 
                  duration: 0.4, 
                  ease: "easeOut", 
                  delay: emergDelay 
                },
                x: {
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                  delay: emergDelay + 0.6,
                },
                y: {
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                  delay: emergDelay + 0.6,
                },
              }}
            >
              <motion.img
                src={icon.src}
                alt={icon.alt}
                className="w-8 h-8 md:w-12 md:h-12 object-contain drop-shadow-lg"
                style={{
                  filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))",
                  willChange: "transform, filter",
                }}
                animate={{
                  scale: [icon.scale, icon.scale * 1.15, icon.scale],
                }}
                transition={{
                  scale: {
                    duration: 4 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: emergDelay + 1 + index * 0.6,
                  },
                }}
                whileHover={{
                  scale: 1.3,
                  filter: "brightness(1.2) drop-shadow(0 6px 16px rgba(24, 105, 211, 0.4))",
                  transition: { duration: 0.2 }
                }}
              />
              
              {/* Glowing effect around icons */}
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400/20 blur-sm -z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.4, 0.8],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  scale: {
                    duration: 3.5 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: emergDelay + 0.6,
                  },
                  opacity: {
                    duration: 3.5 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut", 
                    delay: emergDelay + 0.6,
                  }
                }}
              />
            </motion.div>
          );
        })}
        
        {/* Central glowing dot */}
        <motion.div
          className="absolute top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-blue-400/60"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.3,
            },
            opacity: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.3,
            }
          }}
        />
      </div>
    </div>
  );
};

export default RevolvingIcons;
