import React from 'react';

const BenefitCard = ({ title, percentage, iconSrc }: { title: string; percentage: string; iconSrc: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-4 min-w-[160px] md:min-w-[200px]">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[rgba(242,248,255,0.8)] flex items-center justify-center">
        <img src={iconSrc} alt={title + ' icon'} className="w-10 h-10 md:w-12 md:h-12" />
      </div>
      <h3 className="text-lg md:text-xl font-bold text-[#0E0E0E] text-center whitespace-nowrap">{title}</h3>
      <p className="text-lg md:text-xl font-bold text-[#1A73E8] text-center">{percentage}</p>
    </div>
  );
};

const BenefitsSection = () => {
  return (
    <div className="container mx-auto">
      <div className="w-full overflow-hidden">
        <div className="flex justify-between items-center gap-4 md:gap-8 min-w-[320px] max-w-[1200px] mx-auto">
          <div className="flex-1 min-w-[160px] md:min-w-[200px] flex justify-center">
            <BenefitCard 
              title="Odour-Free" 
              percentage="99%" 
              iconSrc="/svg/odorless.svg" 
            />
          </div>
          <div className="flex-1 min-w-[160px] md:min-w-[200px] flex justify-center">
            <BenefitCard 
              title="Anti-Microbial" 
              percentage="99.9%" 
              iconSrc="/svg/anti-microbial.svg" 
            />
          </div>
          <div className="flex-1 min-w-[160px] md:min-w-[200px] flex justify-center">
            <BenefitCard 
              title="Stain Removal" 
              percentage="99.9%" 
              iconSrc="/svg/stain-removal.svg" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
