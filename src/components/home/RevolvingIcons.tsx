
import React from "react";
import { motion } from "framer-motion";

const RevolvingIcons = () => {
  const icons = [
    {
      src: "/icons/Dry Cleaning-01.png",
      alt: "Dry Cleaning",
      delay: 0,
      orbitRadius: 180,
      floatRadius: 15,
      angle: 0,
      speed: 25,
      scale: 1,
    },
    {
      src: "/icons/Premium laundry.png", 
      alt: "Premium Laundry",
      delay: 3,
      orbitRadius: 220,
      floatRadius: 20,
      angle: 90,
      speed: 30,
      scale: 1.1,
    },
    {
      src: "/icons/Iron copy.png",
      alt: "Ironing",
      delay: 6,
      orbitRadius: 160,
      floatRadius: 12,
      angle: 180,
      speed: 22,
      scale: 0.9,
    },
    {
      src: "/icons/shoes-sets_755745-1286-01.png",
      alt: "Shoe Cleaning",
      delay: 9,
      orbitRadius: 200,
      floatRadius: 18,
      angle: 270,
      speed: 28,
      scale: 1.05,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6"
          style={{
            transformOrigin: `${icon.orbitRadius}px 0px`,
            willChange: "transform",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: icon.speed,
            repeat: Infinity,
            ease: "linear",
            delay: icon.delay,
          }}
          initial={{
            rotate: icon.angle,
          }}
        >
          <motion.div
            className="relative w-12 h-12"
            animate={{
              y: [-icon.floatRadius, icon.floatRadius, -icon.floatRadius],
              scale: [icon.scale, icon.scale * 1.1, icon.scale],
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: icon.delay + 1,
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
                rotate: -360,
                opacity: [0.6, 0.8, 0.9, 0.8, 0.6],
              }}
              transition={{
                rotate: {
                  duration: icon.speed,
                  repeat: Infinity,
                  ease: "linear",
                  delay: icon.delay,
                },
                opacity: {
                  duration: 3 + index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: icon.delay + 0.5,
                },
              }}
              whileHover={{
                scale: 1.2,
                filter: "brightness(1.2) drop-shadow(0 6px 16px rgba(24, 105, 211, 0.3))",
                transition: { duration: 0.2 }
              }}
            />
            
            {/* Subtle glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-400/20 blur-sm -z-10"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2.5 + index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: icon.delay + 2,
              }}
            />
          </motion.div>
        </motion.div>
      ))}
      
      {/* Background orbital rings for depth */}
      <motion.div
        className="absolute top-1/2 left-1/2 border border-blue-100/30 rounded-full -ml-[100px] -mt-[100px] w-[200px] h-[200px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 border border-blue-100/20 rounded-full -ml-[120px] -mt-[120px] w-[240px] h-[240px]"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default RevolvingIcons;
