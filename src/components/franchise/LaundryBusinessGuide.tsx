
import React from 'react';
import { WashingMachine, Handshake } from "lucide-react";

const LaundryBusinessGuide = () => {
  return (
    <div className="space-y-6 mt-8">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-cleancraft-light/30">
        <h2 className="text-xl md:text-2xl font-bold text-google-gray mb-4">How to Start a Laundry Business in India: The Complete Guide</h2>
        
        <p className="mb-4">Starting a laundry business in India represents one of the most <strong>profitable business opportunities in India for 2025</strong>. With urbanization, busy lifestyles, and growing disposable incomes, more people are outsourcing everyday tasks like laundry.</p>
        
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-cleancraft-light/10 p-4 rounded-lg">
            <h3 className="font-semibold text-google-blue mb-2">Benefits of Professional Training</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm md:text-base">
              <li>Learn advanced dry cleaning techniques</li>
              <li>Master franchise business operations</li>
              <li>Understand equipment selection and maintenance</li>
              <li>Develop customer retention strategies</li>
            </ul>
          </div>
          
          <div className="bg-cleancraft-light/10 p-4 rounded-lg">
            <h3 className="font-semibold text-google-red mb-2">Key Success Factors</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm md:text-base">
              <li>Strategic location selection</li>
              <li>Quality equipment investment</li>
              <li>Excellent customer service processes</li>
              <li>Effective pricing strategies</li>
            </ul>
          </div>
        </div>
        
        <p className="mb-4">Ready to dive deeper? Our <strong>laundry and dry cleaning business course</strong> provides comprehensive training designed by industry experts with real-world franchise business experience.</p>
      </div>
      
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-cleancraft-light/30">
        <h2 className="text-xl md:text-2xl font-bold text-google-gray mb-4">Laundry Franchise vs. Starting Your Own Setup</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-google-blue/10 p-2 rounded-full mt-1 flex-shrink-0">
                <Handshake className="h-5 w-5 text-google-blue" />
              </div>
              <div>
                <h3 className="font-medium text-google-blue">Franchise Business Benefits</h3>
                <p className="text-sm text-gray-600 mb-2">When you choose a franchise opportunity in India:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li>Established brand recognition from day one</li>
                  <li>Proven business model with documented success</li>
                  <li>Comprehensive training and ongoing support</li>
                  <li>Access to bulk purchasing discounts</li>
                  <li>Marketing and technology support systems</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-google-green/10 p-2 rounded-full mt-1 flex-shrink-0">
                <WashingMachine className="h-5 w-5 text-google-green" />
              </div>
              <div>
                <h3 className="font-medium text-google-green">Independent Business</h3>
                <p className="text-sm text-gray-600 mb-2">When you start your own laundry business:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li>Complete creative and operational freedom</li>
                  <li>No franchise fees or royalty payments</li>
                  <li>Build your own brand identity</li>
                  <li>Keep all profits without sharing</li>
                  <li>Make independent business decisions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-cleancraft-light/20 rounded-lg">
          <p className="text-sm md:text-base text-center font-medium text-gray-700">
            "For first-time entrepreneurs seeking business opportunities in India, a franchise model offers the safest path to success with the shortest learning curve."
          </p>
        </div>
      </div>
    </div>
  );
};

export default LaundryBusinessGuide;
