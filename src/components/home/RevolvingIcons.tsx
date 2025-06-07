
import React, { useEffect, useState } from "react";

const RevolvingIcons = () => {
  const [dimensions, setDimensions] = useState({ radiusX: 140, radiusY: 160 });

  const icons = [
    {
      src: "/icons/Dry Cleaning-01.png",
      alt: "Dry Cleaning",
      startAngle: 0, // Top
      scale: 1,
    },
    {
      src: "/icons/Premium laundry.png", 
      alt: "Premium Laundry",
      startAngle: 90, // Right
      scale: 1.1,
    },
    {
      src: "/icons/Iron copy.png",
      alt: "Ironing",
      startAngle: 180, // Bottom
      scale: 0.9,
    },
    {
      src: "/icons/shoes-sets_755745-1286-01.png",
      alt: "Shoe Cleaning",
      startAngle: 270, // Left
      scale: 1.05,
    },
  ];

  // Update orbit dimensions responsively
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) { // mobile
        setDimensions({ radiusX: 90, radiusY: 110 });
      } else if (width < 1024) { // tablet
        setDimensions({ radiusX: 110, radiusY: 130 });
      } else { // desktop
        setDimensions({ radiusX: 140, radiusY: 160 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { radiusX, radiusY } = dimensions;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Center point positioned relative to the hero phone image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Static Icons positioned around the center */}
        {icons.map((icon, index) => {
          const angle = (icon.startAngle * Math.PI) / 180;
          const x = Math.cos(angle) * radiusX;
          const y = Math.sin(angle) * radiusY;
          
          return (
            <div
              key={index}
              className="absolute w-8 h-8 md:w-12 md:h-12"
              style={{
                left: x - 16, // Half icon width
                top: y - 16,  // Half icon height
              }}
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-8 h-8 md:w-12 md:h-12 object-contain drop-shadow-lg"
                style={{
                  filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))",
                  transform: `scale(${icon.scale})`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RevolvingIcons;
