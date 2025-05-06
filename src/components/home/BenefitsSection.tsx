import React from 'react';

const BenefitCard = ({ title, percentage, iconSrc }: { title: string; percentage: string; iconSrc: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 gap-4">
      <div className="w-20 h-20 rounded-full bg-[rgba(242,248,255,0.8)] flex items-center justify-center">
        <img src={iconSrc} alt={title + ' icon'} className="w-12 h-12" />
      </div>
      <h3 className="text-xl font-bold text-[#0E0E0E] text-center">{title}</h3>
      <p className="text-xl font-bold text-[#1A73E8] text-center">{percentage}</p>
    </div>
  );
};

const BenefitsSection = () => {
  return (
    <section className="my-16 py-10 px-6 md:px-12 lg:px-28 xl:px-32 flex flex-col md:flex-row w-full">
      <div className="flex-1 flex justify-center">
        <BenefitCard title="Odour-Free" percentage="99%" iconSrc="/svg/odorless.svg" />
      </div>
      <div className="flex-1 flex justify-center">
        <BenefitCard title="Anti-Microbial" percentage="99.9%" iconSrc="/svg/anti-microbial.svg" />
      </div>
      <div className="flex-1 flex justify-center">
        <BenefitCard title="Stain Removal" percentage="99.9%" iconSrc="/svg/stain-removal.svg" />
      </div>
    </section>
  );
};

export default BenefitsSection;
