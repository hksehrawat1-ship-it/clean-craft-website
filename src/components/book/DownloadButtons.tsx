
import React from 'react';
import { Button } from "@/components/ui/button";

const DownloadButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
      <Button
        size="lg"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center gap-3 min-w-[200px] justify-center"
        onClick={() => window.open('https://amazon.in', '_blank')}
      >
        <div className="flex items-center justify-center w-6 h-6">
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.492.13.12.17.09.388-.09.654-.18.266-.57.49-1.167.67-1.153.36-2.352.683-3.59.97-1.238.287-2.416.43-3.533.43-4.105 0-7.94-1.215-11.504-3.645C.665 18.263.12 17.986.045 18.02zm21.634-4.651c-.315-.445-.99-.375-2.027.211-.345.195-.69.39-1.035.585a8.956 8.956 0 01-1.155.585c-.375.18-.735.315-1.08.405-.345.09-.645.135-.9.135-.255 0-.42-.075-.495-.225-.075-.15-.045-.36.09-.63.135-.27.36-.555.675-.855.315-.3.69-.57 1.125-.81.435-.24.855-.405 1.26-.495.405-.09.735-.135.99-.135.255 0 .42.075.495.225.075.15.045.36-.09.63z"/>
          </svg>
        </div>
        <span className="font-medium">Download on Amazon</span>
      </Button>

      <Button
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-3 min-w-[200px] justify-center"
        onClick={() => window.open('https://flipkart.com', '_blank')}
      >
        <div className="flex items-center justify-center w-6 h-6">
          <img
            src="/lovable-uploads/flipkart-logo.png"
            alt="Flipkart"
            className="w-5 h-5 object-contain"
            onError={(e) => {
              // Fallback SVG if image fails to load
              e.currentTarget.style.display = 'none';
              const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
              svg.setAttribute('viewBox', '0 0 24 24');
              svg.setAttribute('fill', 'currentColor');
              svg.setAttribute('class', 'w-5 h-5');
              svg.innerHTML = '<path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm8-1h3v2H10v-2zm0-4h3v2H10V7z"/>';
              e.currentTarget.parentElement?.appendChild(svg);
            }}
          />
        </div>
        <span className="font-medium">Download on Flipkart</span>
      </Button>
    </div>
  );
};

export default DownloadButtons;
