
import React from "react";
import { motion } from "framer-motion";

const RevolvingIcons = () => {
  const icons = [
    {
      src: "/icons/Dry Cleaning-01.png",
      alt: "Dry Cleaning",
      angle: 0, // Top
      speed: 25,
      scale: 1,
    },
    {
      src: "/icons/Premium laundry.png", 
      alt: "Premium Laundry",
      angle: 90, // Right
      speed: 25,
      scale: 1.1,
    },
    {
      src: "/icons/Iron copy.png",
      alt: "Ironing",
      angle: 180, // Bottom
      speed: 25,
      scale: 0.9,
    },
    {
      src: "/icons/shoes-sets_755745-1286-01.png",
      alt: "Shoe Cleaning",
      angle: 270, // Left
      speed: 25,
      scale: 1.05,
    },
  ];

  const orbitRadius = 120; // Radius for the circular orbit

  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
      {/* Center point relative to the hero image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Main orbital path - dotted circle */}
        <motion.div
          className="absolute rounded-full border-2 border-dotted border-blue-300/60"
          style={{
            width: orbitRadius * 2,
            height: orbitRadius * 2,
            left: -orbitRadius,
            top: -orbitRadius,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Secondary flowing dotted lines */}
        <motion.div
          className="absolute rounded-full border border-dotted border-blue-200/40"
          style={{
            width: (orbitRadius + 20) * 2,
            height: (orbitRadius + 20) * 2,
            left: -(orbitRadius + 20),
            top: -(orbitRadius + 20),
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <motion.div
          className="absolute rounded-full border border-dotted border-blue-100/30"
          style={{
            width: (orbitRadius - 20) * 2,
            height: (orbitRadius - 20) * 2,
            left: -(orbitRadius - 20),
            top: -(orbitRadius - 20),
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Revolving Icons */}
        {icons.map((icon, index) => {
          // Calculate initial position on circle
          const initialAngle = (icon.angle * Math.PI) / 180;
          const initialX = Math.cos(initialAngle) * orbitRadius;
          const initialY = Math.sin(initialAngle) * orbitRadius;

          return (
            <motion.div
              key={index}
              className="absolute w-12 h-12"
              style={{
                left: initialX - 24, // Center the 48px icon
                top: initialY - 24,
              }}
              animate={{
                x: [
                  Math.cos(initialAngle) * orbitRadius - 24,
                  Math.cos(initialAngle + Math.PI / 2) * orbitRadius - 24,
                  Math.cos(initialAngle + Math.PI) * orbitRadius - 24,
                  Math.cos(initialAngle + (3 * Math.PI) / 2) * orbitRadius - 24,
                  Math.cos(initialAngle + 2 * Math.PI) * orbitRadius - 24,
                ],
                y: [
                  Math.sin(initialAngle) * orbitRadius - 24,
                  Math.sin(initialAngle + Math.PI / 2) * orbitRadius - 24,
                  Math.sin(initialAngle + Math.PI) * orbitRadius - 24,
                  Math.sin(initialAngle + (3 * Math.PI) / 2) * orbitRadius - 24,
                  Math.sin(initialAngle + 2 * Math.PI) * orbitRadius - 24,
                ],
              }}
              transition={{
                duration: icon.speed,
                repeat: Infinity,
                ease: "linear",
                delay: index * (icon.speed / 4), // Staggered start
              }}
            >
              <motion.img
                src={icon.src}
                alt={icon.alt}
                className="w-12 h-12 object-contain drop-shadow-lg"
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
                    delay: index * 0.6,
                  },
                  opacity: {
                    duration: 4 + index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.7,
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
                animate={{
                  scale: [0.8, 1.4, 0.8],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3.5 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 1.2,
                }}
              />
            </motion.div>
          );
        })}
        
        {/* Central glowing dot */}
        <motion.div
          className="absolute top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-blue-400/60"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default RevolvingIcons;
