
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const FranchiseComparison = () => {
  // Define comparison data
  const comparisonData = [
    {
      feature: "Initial Investment",
      cleancraft: "₹15-25 Lakh",
      companyA: "₹25-35 Lakh",
      companyB: "₹30-40 Lakh",
      companyC: "₹25-30 Lakh",
      international: "₹40-50 Lakh",
      highlight: "Low investment with premium setup"
    },
    {
      feature: "Royalty Fee",
      cleancraft: "0%",
      companyA: "8-10%",
      companyB: "5-7%",
      companyC: "6-8%",
      international: "12-15%",
      highlight: "No royalty guarantee if not profitable within 7 months"
    },
    {
      feature: "Breakeven Period",
      cleancraft: "7-8 months",
      companyA: "12-15 months",
      companyB: "14-18 months",
      companyC: "10-12 months",
      international: "18-24 months",
      highlight: "Fastest ROI in the industry"
    },
    {
      feature: "Profit Margin",
      cleancraft: "62-68%",
      companyA: "45-50%",
      companyB: "40-45%",
      companyC: "50-55%",
      international: "40-50%",
      highlight: "Industry-leading margins through proprietary systems"
    },
    {
      feature: "Training Support",
      cleancraft: true,
      companyA: true,
      companyB: false,
      companyC: true,
      international: true,
      highlight: "Comprehensive training with real trade secrets"
    },
    {
      feature: "Marketing Support",
      cleancraft: true,
      companyA: false,
      companyB: true,
      companyC: false,
      international: true,
      highlight: "Guaranteed 1000+ customers in first year"
    },
    {
      feature: "Technology Platform",
      cleancraft: true,
      companyA: false,
      companyB: false,
      companyC: true,
      international: true,
      highlight: "Proprietary Pappy Wash™ 2025 technology"
    },
    {
      feature: "Store Setup Time",
      cleancraft: "30 days",
      companyA: "60-90 days",
      companyB: "45-60 days",
      companyC: "45-60 days",
      international: "90-120 days",
      highlight: "Fastest setup or we pay your rent"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
      <div className="text-center mb-8">
        <Badge className="bg-cleancraft-gold text-white mb-4 hover:bg-cleancraft-darkgold">Franchise Comparison</Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">How <span className="text-google-blue">Clean Craft</span> Compares</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See how Clean Craft stacks up against other laundry franchises in the market
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Features</th>
              <th className="px-4 py-3 text-center">
                <div className="flex flex-col items-center">
                  <span className="font-bold text-google-blue">Clean Craft</span>
                  <Badge className="mt-1 bg-cleancraft-gold text-xs">Recommended</Badge>
                </div>
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Company A</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Company B</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Company C</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">International</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((item, index) => (
              <tr 
                key={index} 
                className={cn(
                  "border-b hover:bg-gray-50 transition-colors",
                  index % 2 === 0 && "bg-gray-50/50"
                )}
              >
                <td className="px-4 py-3 text-sm font-medium">{item.feature}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex flex-col items-center">
                    {typeof item.cleancraft === 'boolean' ? (
                      item.cleancraft ? 
                        <Check className="h-5 w-5 text-google-green mx-auto" /> : 
                        <X className="h-5 w-5 text-google-red mx-auto" />
                    ) : (
                      <span className="font-medium text-google-blue">{item.cleancraft}</span>
                    )}
                    <span className="text-xs text-google-green mt-1 hidden md:inline-block">{item.highlight}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  {typeof item.companyA === 'boolean' ? (
                    item.companyA ? 
                      <Check className="h-5 w-5 text-google-green mx-auto" /> : 
                      <X className="h-5 w-5 text-google-red mx-auto" />
                  ) : (
                    <span>{item.companyA}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {typeof item.companyB === 'boolean' ? (
                    item.companyB ? 
                      <Check className="h-5 w-5 text-google-green mx-auto" /> : 
                      <X className="h-5 w-5 text-google-red mx-auto" />
                  ) : (
                    <span>{item.companyB}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {typeof item.companyC === 'boolean' ? (
                    item.companyC ? 
                      <Check className="h-5 w-5 text-google-green mx-auto" /> : 
                      <X className="h-5 w-5 text-google-red mx-auto" />
                  ) : (
                    <span>{item.companyC}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {typeof item.international === 'boolean' ? (
                    item.international ? 
                      <Check className="h-5 w-5 text-google-green mx-auto" /> : 
                      <X className="h-5 w-5 text-google-red mx-auto" />
                  ) : (
                    <span>{item.international}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile-only highlights section */}
      <div className="md:hidden mt-6 space-y-3">
        <h3 className="font-semibold text-google-blue">Clean Craft Advantages:</h3>
        {comparisonData.map((item, index) => (
          <div key={`highlight-${index}`} className="flex items-start gap-2">
            <Check className="h-4 w-4 text-google-green mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-700">{item.highlight}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-cleancraft-light/20 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-google-blue text-lg mb-1">The Clean Craft Advantage</h3>
            <p className="text-gray-600">No other franchise offers our unique combination of low investment, zero royalty guarantee, and industry-leading technology.</p>
          </div>
          <Card className="bg-google-blue p-3 text-white text-center w-full md:w-auto md:min-w-[220px] google-shadow">
            <p className="font-bold">Winner: Clean Craft</p>
            <p className="text-xs opacity-90">Best Laundry Franchise in India 2025</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FranchiseComparison;
