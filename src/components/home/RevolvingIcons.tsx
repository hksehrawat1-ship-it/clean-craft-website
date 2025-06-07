
import React from "react";
import { motion } from "framer-motion";

const RevolvingIcons = () => {
  const icons = [
    {
      src: "/icons/Dry Cleaning-01.png",
      alt: "Dry Cleaning",
      delay: 0,
      radius: 200,
      angle: 0,
    },
    {
      src: "/icons/Premium laundry.png", 
      alt: "Premium Laundry",
      delay: 2,
      radius: 220,
      angle: 90,
    },
    {
      src: "/icons/Iron copy.png",
      alt: "Ironing",
      delay: 4,
      radius: 180,
      angle: 180,
    },
    {
      src: "/icons/shoes-sets_755745-1286-01.png",
      alt: "Shoe Cleaning",
      delay: 6,
      radius: 240,
      angle: 270,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: icon.delay,
          }}
          style={{
            transformOrigin: `${icon.radius}px 0px`,
          }}
          initial={{
            rotate: icon.angle,
          }}
        >
          <motion.img
            src={icon.src}
            alt={icon.alt}
            className="w-12 h-12 object-contain opacity-60 hover:opacity-80 transition-opacity"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: icon.delay,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default RevolvingIcons;
