
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

  // Responsive orbit radius - smaller on mobile
  const orbitRadius = typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 120;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Center point relative to the hero image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Main orbital path - dotted circle - appears first */}
        <motion.div
          className="absolute rounded-full border-2 border-dotted border-blue-300/60"
          style={{
            width: orbitRadius * 2,
            height: orbitRadius * 2,
            left: -orbitRadius,
            top: -orbitRadius,
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
        
        {/* Secondary flowing dotted lines - staggered appearance */}
        <motion.div
          className="absolute rounded-full border border-dotted border-blue-200/40"
          style={{
            width: (orbitRadius + 15) * 2,
            height: (orbitRadius + 15) * 2,
            left: -(orbitRadius + 15),
            top: -(orbitRadius + 15),
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
          className="absolute rounded-full border border-dotted border-blue-100/30"
          style={{
            width: (orbitRadius - 15) * 2,
            height: (orbitRadius - 15) * 2,
            left: -(orbitRadius - 15),
            top: -(orbitRadius - 15),
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

        {/* Revolving Icons with true orbital motion */}
        {icons.map((icon, index) => {
          const emergDelay = 1.5 + index * 0.3; // Icons emerge after circles are established
          
          return (
            <motion.div
              key={index}
              className="absolute w-8 h-8 md:w-12 md:h-12"
              style={{
                left: -16, // Center the icon at origin
                top: -16,
              }}
              initial={{ 
                scale: 0, 
                opacity: 0,
                x: Math.cos((icon.angle * Math.PI) / 180) * orbitRadius,
                y: Math.sin((icon.angle * Math.PI) / 180) * orbitRadius,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                x: [
                  Math.cos((icon.angle * Math.PI) / 180) * orbitRadius,
                  Math.cos(((icon.angle + 90) * Math.PI) / 180) * orbitRadius,
                  Math.cos(((icon.angle + 180) * Math.PI) / 180) * orbitRadius,
                  Math.cos(((icon.angle + 270) * Math.PI) / 180) * orbitRadius,
                  Math.cos((icon.angle * Math.PI) / 180) * orbitRadius,
                ],
                y: [
                  Math.sin((icon.angle * Math.PI) / 180) * orbitRadius,
                  Math.sin(((icon.angle + 90) * Math.PI) / 180) * orbitRadius,
                  Math.sin(((icon.angle + 180) * Math.PI) / 180) * orbitRadius,
                  Math.sin(((icon.angle + 270) * Math.PI) / 180) * orbitRadius,
                  Math.sin((icon.angle * Math.PI) / 180) * orbitRadius,
                ],
              }}
              transition={{
                // Emergence animation
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
                // Orbital motion - starts after emergence
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
                  opacity: [0.7, 0.9, 1, 0.9, 0.7],
                }}
                transition={{
                  scale: {
                    duration: 4 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: emergDelay + 1 + index * 0.6,
                  },
                  opacity: {
                    duration: 4 + index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: emergDelay + 1 + index * 0.7,
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
        
        {/* Central glowing dot - appears early in sequence */}
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
