
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, IndianRupee, BadgeIndianRupee } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import FranchiseFormModal from "./FranchiseFormModal";

const LaundryRoiCalculator = () => {
  const [investment, setInvestment] = useState<string>("1500000");
  const [showResults, setShowResults] = useState(false);
  const [monthlyRoi, setMonthlyRoi] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isMobile = useIsMobile();

  // Format number with commas for Indian numbering system
  const formatIndianNumber = (num: number) => {
    return num.toLocaleString("en-IN");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setInvestment(value);
    setShowResults(false);
  };

  // Calculate 62% return on investment
  const calculateReturn = () => {
    const investNum = parseInt(investment);
    if (isNaN(investNum)) return 0;
    return Math.floor(investNum * 0.62);
  };

  const handleCalculate = () => {
    const annualProfit = calculateReturn();
    const monthly = Math.floor(annualProfit / 12);
    setMonthlyRoi(formatIndianNumber(monthly));
    setShowResults(true);
    
    // Open form after showing results
    setTimeout(() => {
      setIsFormOpen(true);
    }, 1000);
  };

  const totalReturn = calculateReturn();
  const monthlyReturn = totalReturn / 12;

  // Dynamic title based on results
  const getFormTitle = () => {
    if (showResults && monthlyRoi) {
      return `Start Earning ₹${formatIndianNumber(monthlyReturn)} in Just a Month`;
    }
    return "Your Earnings Are a Call Away";
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md mx-auto google-shadow">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/lovable-uploads/cleancraft-icon.png"
              alt="Clean Craft Laundry Franchise Logo"
              className="h-16 w-16 object-contain"
            />
            <h3 className="font-semibold text-xl text-google-gray ml-2">
              CleanCraft
            </h3>
          </div>
          <h3 className="font-semibold text-xl text-cleancraft-darkgold mb-4 text-center">
            Laundry Franchise ROI Calculator
          </h3>

          <div className={`space-y-${isMobile ? "3" : "4"}`}>
            {/* Section 1: Initial Investment */}
            <div className="bg-cleancraft-light/10 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <BadgeIndianRupee className="h-4 w-4 mr-2 text-google-blue" />
                <label className="block text-sm font-medium text-gray-600">
                  1. Initial Investment
                </label>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">
                  <IndianRupee className="h-4 w-4" />
                </span>
                <Input
                  type="text"
                  className="w-full pl-8 pr-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-cleancraft-gold focus:border-transparent"
                  placeholder="15,00,000"
                  value={investment.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  onChange={handleInputChange}
                  aria-label="Enter initial investment amount"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Typical range: ₹15-25 Lakh
              </p>
            </div>

            {/* Section 2: Automatically calculate 62% return */}
            <div className="bg-cleancraft-light/10 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <Calculator className="h-4 w-4 mr-2 text-google-red" />
                <label className="block text-sm font-medium text-gray-600">
                  2. Expected Annual Return (62% of investment)
                </label>
              </div>
              <div className="relative bg-cleancraft-light/20 py-3 px-4 rounded-md">
                <span className="text-google-blue font-medium">
                  ₹{formatIndianNumber(totalReturn)}
                </span>
              </div>
            </div>

            {/* Section 3: Monthly ROI Result */}
            <div className="bg-cleancraft-light/10 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <Calculator className="h-4 w-4 mr-2 text-google-red" />
                <label className="block text-sm font-medium text-gray-600">
                  3. Monthly ROI
                </label>
              </div>
              <div
                className={`relative ${
                  showResults
                    ? "bg-cleancraft-light/50"
                    : "bg-cleancraft-light/20"
                } py-3 px-4 rounded-md transition-colors duration-300`}
              >
                <span
                  className={`${
                    showResults
                      ? "text-google-green font-semibold"
                      : "text-gray-400"
                  } transition-colors duration-300`}
                >
                  {showResults ? `₹${monthlyRoi}` : "Calculate to see results"}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={handleCalculate}
                className="w-full bg-cleancraft-gold hover:bg-cleancraft-darkgold text-white font-semibold"
              >
                Calculate ROI
              </Button>
            </div>

            <p className="text-center text-sm text-gray-500 pt-1">
              Schedule a franchise consultation today
            </p>
          </div>
        </div>

        <div className="bg-cleancraft-light/30 p-4 border-t border-cleancraft-light">
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="flex items-center">
              <Badge className="bg-google-green text-white mr-2">Zero Risk</Badge>
              <p className="text-sm font-medium text-google-gray">
                100% Royalty Free Guarantee
              </p>
            </div>
            <p className="text-xs italic text-gray-600">
              The Perfect Time Is Now
            </p>
          </div>
        </div>
      </div>

      <FranchiseFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={getFormTitle()}
        sourceCta="Calculate ROI"
      />
    </>
  );
};

export default LaundryRoiCalculator;
