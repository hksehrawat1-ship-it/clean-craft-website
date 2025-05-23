
import React from "react";
import { Button } from "@/components/ui/button";

const IdealFranchiseSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            This Franchise Is{" "}
            <span className="text-[#4a9c7f]">Perfect</span>{" "}
            <span className="text-green-500">IF YOU ARE:</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join hundreds of successful franchise owners who found their perfect
            business match
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="14" x="3" y="4" rx="2" />
                <path d="M16 8v-.8A2.2 2.2 0 0 0 13.8 5h-3.6A2.2 2.2 0 0 0 8 7.2v.8" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Business Owner</h3>
            <p className="text-gray-600">
              A businessman tired of rising competition and low margins
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Salaried Professional</h3>
            <p className="text-gray-600">
              A salaried professional looking for a stable side business
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-50 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">First-Time Entrepreneur</h3>
            <p className="text-gray-600">
              A first-time entrepreneur seeking a proven system
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-50 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m16 8-2 6-6 2 6-6 2-2Z" />
                <path d="M9.01 11.5a3 3 0 0 0 4.5 4.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Freedom Seeker</h3>
            <p className="text-gray-600">
              Someone wanting financial freedom with minimal risk
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8">
            Get Case Studies from People Like You
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IdealFranchiseSection;
