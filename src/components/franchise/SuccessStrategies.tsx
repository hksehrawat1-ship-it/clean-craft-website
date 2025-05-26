
import React from 'react';
import { Users, TrendingUp } from "lucide-react";

const SuccessStrategies = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-cleancraft-light/30 mt-8">
      <h2 className="text-xl md:text-2xl font-bold text-google-gray mb-4">How to Run a Successful Laundry Business</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="mb-4 text-sm md:text-base">Running a successful laundry franchise business requires strategic planning, operational excellence, and customer focus. Here are proven strategies from our <strong>dry cleaning business training</strong> programs:</p>
          
          <div className="space-y-4 mt-6">
            <div className="flex items-start space-x-3">
              <div className="bg-google-blue/10 p-2 rounded-full flex-shrink-0">
                <Users className="h-5 w-5 text-google-blue" />
              </div>
              <div>
                <h3 className="font-medium text-google-gray">Build Customer Loyalty</h3>
                <p className="text-sm text-gray-600">Implement loyalty programs, maintain consistent quality, and offer personalized service to keep customers coming back.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-google-green/10 p-2 rounded-full flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-google-green" />
              </div>
              <div>
                <h3 className="font-medium text-google-gray">Operational Efficiency</h3>
                <p className="text-sm text-gray-600">Optimize workflows, invest in quality equipment, and train staff thoroughly to maximize productivity in your franchise business.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-cleancraft-light/10 p-6 rounded-lg">
          <h3 className="font-semibold text-google-blue mb-3">Success Story: Rajesh from Mumbai</h3>
          <p className="text-sm text-gray-700 italic">
            "After exploring various business opportunities in India, I chose the Clean Craft <strong>franchise opportunity</strong>. After taking their <strong>online laundry business course</strong>, I implemented their systematic approach in my new store. Within 6 months, I was serving over 100 regular customers, with 60% becoming repeat clients."
          </p>
          <div className="mt-3 flex items-center">
            <div className="bg-google-blue rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white font-bold text-sm md:text-base">
              R
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Rajesh Sharma</p>
              <p className="text-xs text-gray-500">Clean Craft Franchise Owner, Mumbai</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold text-google-gray mb-3">Key Performance Indicators to Monitor:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded border border-cleancraft-light text-center">
            <p className="text-google-blue font-bold text-lg md:text-xl">60-65%</p>
            <p className="text-xs text-gray-600">Gross Margin Target</p>
          </div>
          <div className="bg-white p-3 rounded border border-cleancraft-light text-center">
            <p className="text-google-green font-bold text-lg md:text-xl">45-50%</p>
            <p className="text-xs text-gray-600">Repeat Customer Rate</p>
          </div>
          <div className="bg-white p-3 rounded border border-cleancraft-light text-center">
            <p className="text-google-red font-bold text-lg md:text-xl">₹800-1200</p>
            <p className="text-xs text-gray-600">Revenue per sq ft</p>
          </div>
          <div className="bg-white p-3 rounded border border-cleancraft-light text-center">
            <p className="text-cleancraft-darkgold font-bold text-lg md:text-xl">7-8 mo</p>
            <p className="text-xs text-gray-600">Breakeven Period</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStrategies;
