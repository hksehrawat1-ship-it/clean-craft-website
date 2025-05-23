
import React from "react";
import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Franchise comparison table data
const comparisonData = [
  {
    category: "Laundry",
    lowInvestment: true,
    quickBreakeven: true,
    highProfit: true,
    easyOperations: true,
    recurringRevenue: true,
    riskFactor: "Low",
    preference: "#1",
    preferenceColor: "bg-blue-500",
  },
  {
    category: "Food",
    lowInvestment: false,
    quickBreakeven: false,
    highProfit: true,
    easyOperations: false,
    recurringRevenue: false,
    riskFactor: "High",
    preference: "#3",
    preferenceColor: "bg-amber-400",
  },
  {
    category: "Preschool",
    lowInvestment: false,
    quickBreakeven: false,
    highProfit: true,
    easyOperations: false,
    recurringRevenue: true,
    riskFactor: "Medium",
    preference: "#4",
    preferenceColor: "bg-amber-400",
  },
  {
    category: "Beauty & Wellness",
    lowInvestment: true,
    quickBreakeven: false,
    highProfit: false,
    easyOperations: true,
    recurringRevenue: true,
    riskFactor: "Medium",
    preference: "#5",
    preferenceColor: "bg-red-500",
  },
  {
    category: "Retail",
    lowInvestment: false,
    quickBreakeven: false,
    highProfit: false,
    easyOperations: true,
    recurringRevenue: false,
    riskFactor: "High",
    preference: "#2",
    preferenceColor: "bg-green-500",
  },
];

const FranchiseComparisonTable: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            2025 Franchise{" "}
            <span className="text-[#5293C7]">Com</span>
            <span className="text-[#57B894]">parison</span>
          </h2>
          <p className="text-lg text-gray-600">
            See why laundry is the most preferred franchise business in 2025
          </p>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-4 max-w-4xl mx-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-white border-b">
                <TableHead className="font-semibold text-gray-700">
                  Category
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-700">
                  <div className="flex flex-col items-center">
                    <span>Low</span>
                    <span>Investment</span>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-700">
                  <div className="flex flex-col items-center">
                    <span>Quick</span>
                    <span>Breakeven</span>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-700">
                  <div className="flex flex-col items-center">
                    <span>High</span>
                    <span>Profit</span>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-700">
                  <div className="flex flex-col items-center">
                    <span>Easy</span>
                    <span>Operations</span>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-700">
                  <div className="flex flex-col items-center">
                    <span>Recurring</span>
                    <span>Revenue</span>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-700">
                  <div className="flex flex-col items-center">
                    <span>Risk</span>
                    <span>Factor</span>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-700">
                  <div className="flex flex-col items-center">
                    <span>2025</span>
                    <span>Preference</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((item, index) => (
                <TableRow key={index} className="border-b hover:bg-gray-50">
                  <TableCell
                    className={`font-medium ${
                      item.category === "Laundry"
                        ? "text-[#5293C7]"
                        : "text-gray-700"
                    }`}
                  >
                    {item.category}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.lowInvestment ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.quickBreakeven ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.highProfit ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.easyOperations ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.recurringRevenue ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        item.riskFactor === "Low"
                          ? "text-green-600"
                          : item.riskFactor === "Medium"
                          ? "text-amber-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.riskFactor}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-medium ${item.preferenceColor}`}
                    >
                      {item.preference}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="text-center mt-4">
          <p className="text-lg font-medium text-gray-700">
            Laundry Franchise: #1 Choice for Entrepreneurs in 2025
          </p>
        </div>
      </div>
    </section>
  );
};

export default FranchiseComparisonTable;
