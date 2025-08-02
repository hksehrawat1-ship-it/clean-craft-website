import React from "react";

const InTheHeadlines = () => {
  const mediaLogos = [
    {
      src: "/lovable-uploads/1fa381f5-bc30-4102-ab04-d49f46b4bfe7.png",
      alt: "VCCircle",
    },
    {
      src: "/lovable-uploads/576c7327-bd9d-4c06-b822-d9337c8b5729.png",
      alt: "Forbes India",
    },
    {
      src: "/lovable-uploads/aa840b68-f9fe-4e79-956e-20b7a8f0691d.png",
      alt: "Hindustan Times",
    },
    {
      src: "/lovable-uploads/420031f4-f843-4c28-90d2-b97d90eaf38b.png",
      alt: "Entrepreneur India",
    },
    {
      src: "/lovable-uploads/cfcd1762-dc8c-4f14-a43f-bc94c76b7e49.png",
      alt: "Fortune India",
    },
    {
      src: "/lovable-uploads/0cb7b37c-d741-42c3-a21d-8f8bf643d1c7.png",
      alt: "Fortune India",
    },
    {
      src: "/lovable-uploads/aecd2869-32b6-4010-987e-b5c3d85db1b1.png",
      alt: "CEO Insights",
    },
    {
      src: "/lovable-uploads/ccf840a1-8440-42ce-adb4-fd5aa2a6f5e9.png",
      alt: "News Outlook India",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            In the Headlines
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="overflow-hidden">
          <div className="flex animate-scroll space-x-12 items-center">
            {[...mediaLogos, ...mediaLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-46 h-24 flex items-center justify-center bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 8s linear infinite;
        }
        
        @media (min-width: 768px) {
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default InTheHeadlines;
