
import React from 'react';
import { Button } from "@/components/ui/button";

const LaundryBusinessCost = () => {
  return (
    <div className="space-y-6 mt-8">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-cleancraft-light/30">
        <h2 className="text-xl md:text-2xl font-bold text-google-gray mb-4">Laundry Business Cost in India: What to Expect</h2>
        
        <div className="space-y-4">
          <p className="text-gray-700 text-sm md:text-base">Understanding the <strong>laundry business cost in India</strong> is essential for proper planning and financing. Here's a breakdown of major expense categories for this franchise opportunity in India:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 border border-cleancraft-light rounded-lg">
              <h3 className="font-semibold text-google-blue mb-2">Initial Setup</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Space (1000 sq ft)</span>
                  <span className="font-medium">₹10-15 Lakh</span>
                </li>
                <li className="flex justify-between">
                  <span>Equipment</span>
                  <span className="font-medium">₹8-12 Lakh</span>
                </li>
                <li className="flex justify-between">
                  <span>Interior & Utilities</span>
                  <span className="font-medium">₹2-4 Lakh</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 border border-cleancraft-light rounded-lg">
              <h3 className="font-semibold text-google-red mb-2">Operational Costs</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Rent (Monthly)</span>
                  <span className="font-medium">₹25-50K</span>
                </li>
                <li className="flex justify-between">
                  <span>Utilities</span>
                  <span className="font-medium">₹15-25K</span>
                </li>
                <li className="flex justify-between">
                  <span>Staff</span>
                  <span className="font-medium">₹30-50K</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 border border-cleancraft-light rounded-lg sm:col-span-2 md:col-span-1">
              <h3 className="font-semibold text-google-green mb-2">Additional Expenses</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Marketing</span>
                  <span className="font-medium">₹20-40K</span>
                </li>
                <li className="flex justify-between">
                  <span>Software</span>
                  <span className="font-medium">₹5-10K</span>
                </li>
                <li className="flex justify-between">
                  <span>Consumables</span>
                  <span className="font-medium">₹15-25K</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-cleancraft-light/20 p-4 rounded-lg mt-4">
            <h3 className="font-medium text-google-gray mb-2 text-center">Total Investment Range</h3>
            <p className="text-center text-xl font-bold text-google-blue">₹15 Lakh - ₹25 Lakh</p>
            <p className="text-center text-sm text-gray-600 mt-2">With franchise option: Additional ₹2-5 Lakh for franchise fee</p>
          </div>
        </div>
      </div>

      <div className="bg-cleancraft-light/30 p-6 md:p-8 rounded-xl text-center">
        <h2 className="text-xl md:text-2xl font-bold text-google-gray mb-3">Ready to Start Your Franchise Business Journey?</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6 text-sm md:text-base">
          Explore the best franchise opportunity in India with our comprehensive <strong>dry cleaning training course in India</strong> and learn from industry experts with over 20 years of experience. Discover why laundry is one of the most <strong>profitable business ideas in India for 2025</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-google-blue hover:bg-google-blue/90 text-white">
            Download Free Franchise Guide
          </Button>
          <Button className="bg-cleancraft-gold hover:bg-cleancraft-darkgold text-white">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LaundryBusinessCost;
