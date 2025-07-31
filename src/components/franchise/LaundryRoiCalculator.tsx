import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, IndianRupee, BadgeIndianRupee } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import FranchiseFormModal from "./FranchiseFormModal";

const LaundryRoiCalculator = () => {
  const [investment, setInvestment] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [monthlyRoi, setMonthlyRoi] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isMobile = useIsMobile();

  const formatIndianNumber = (num: number) => num.toLocaleString("en-IN");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setInvestment(value);
    setShowResults(false);
  };

  const calculateReturn = () => {
    const investNum = parseInt(investment);
    if (isNaN(investNum)) return 0;
    return Math.floor(investNum * 0.62);
  };

  const handleCalculate = () => {
    if (!investment) {
      alert("Please enter your investment amount.");
      return;
    }

    const annualProfit = calculateReturn();
    const monthly = Math.floor(annualProfit / 12);
    setMonthlyRoi(formatIndianNumber(monthly));
    setShowResults(true);
    setIsFormOpen(true);
  };

  const totalReturn = calculateReturn();
  const monthlyReturn = Math.floor(totalReturn / 12);

  const getFormTitle = () =>
    showResults && monthlyRoi
      ? `Start Earning ₹${formatIndianNumber(monthlyReturn)} in Just a Month`
      : "Your Earnings Are a Call Away";

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md mx-auto google-shadow">
        <div className="px-6 py-2">
          {/* Logo & Heading */}

          <h3 className="font-semibold text-xl text-cleancraft-darkgold mb-3 text-center">
            Laundry Franchise ROI Calculator
          </h3>

          {/* Calculator Fields */}
          <div className={`space-y-${isMobile ? "3" : "4"}`}>
            {/* 1. Initial Investment */}
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
                  placeholder="Enter Your Investment"
                  value={
                    investment
                      ? investment.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : ""
                  }
                  onChange={handleInputChange}
                  aria-label="Enter initial investment amount"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 mb-0">
                Typical range: ₹23 – 25 Lakh
              </p>
            </div>

            {/* 2. Expected Annual Return */}
            <div className="bg-cleancraft-light/10 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <Calculator className="h-4 w-4 mr-2 text-google-red" />
                <label className="block text-sm font-medium text-gray-600">
                  2. Expected Annual Return (62 % of investment)
                </label>
              </div>
              <div className="relative bg-cleancraft-light/20 py-3 px-4 rounded-md">
                <span
                  className={`font-medium ${
                    investment ? "text-google-blue" : "text-gray-500 italic"
                  }`}
                >
                  {investment
                    ? `₹${formatIndianNumber(totalReturn)}`
                    : "Check Gross Margin"}
                </span>
              </div>
            </div>

            {/* 3. Monthly ROI */}
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
                  className={`transition-colors duration-300 ${
                    showResults
                      ? "text-google-green font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  {showResults ? `₹${monthlyRoi}` : "Calculate to see results"}
                </span>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="pt-2">
              <Button
                onClick={handleCalculate}
                disabled={!investment}
                className="w-full bg-cleancraft-gold hover:bg-cleancraft-darkgold text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate ROI
              </Button>
            </div>
            <p className="text-center text-sm text-gray-500 pt-1">
              Schedule a franchise consultation today
            </p>
          </div>
        </div>

        {/* Footer Badge */}
        <div className="bg-cleancraft-light/30 p-4 border-t border-cleancraft-light">
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="flex items-center">
              <Badge className="bg-google-green text-white mr-2">
                Zero Risk
              </Badge>
              <p className="text-sm font-medium text-google-gray">
                100 % Royalty Free Guarantee
              </p>
            </div>
            <p className="text-xs italic text-gray-600">
              The Perfect Time Is Now
            </p>
          </div>
        </div>
      </div>

      {/* Franchise Form Modal */}
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
