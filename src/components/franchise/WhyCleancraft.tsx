import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import FranchiseFormModal from "./FranchiseFormModal";
import LaundryRoiCalculator from "@/components/franchise/LaundryRoiCalculator";

const WhyCleancraft = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const revenueData = [
    { month: "Month 1", revenue: 25000 },
    { month: "Month 2", revenue: 45000 },
    { month: "Month 3", revenue: 70000 },
    { month: "Month 4", revenue: 100000 },
    { month: "Month 5", revenue: 120000 },
    { month: "Month 6", revenue: 140000 },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-800 mb-6">
            Why Cleancraft?
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Turn your dream into a profitable business from the 1st month with
            the expert support of Cleancraft's experienced team. Whether you're
            just starting out or looking for a proven model, Cleancraft helps
            individuals launch revenue-generating Laundry & Dry cleaning
            businesses from day one.
          </p>
        </div>

        {/* 2-column Layout with Equal Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left: Bar Chart + CTA */}
          <div className="flex flex-col justify-between flex-1">
            <Card className="border-0 shadow-lg bg-white flex-1">
              <CardContent className="p-8">
                <h3 className="text-2xl font-medium text-gray-800 text-center mb-8">
                  Monthly Profit Potential
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: "#d1d5db" }}
                      />
                      <YAxis
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: "#d1d5db" }}
                        tickFormatter={(value) => `₹${value.toLocaleString()}`}
                      />
                      <Tooltip
                        formatter={(value) => [
                          `₹${value.toLocaleString()}`,
                          "Revenue",
                        ]}
                        labelStyle={{ color: "#374151" }}
                        contentStyle={{
                          backgroundColor: "#f9fafb",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="revenue"
                        fill="#2563eb"
                        radius={[4, 4, 0, 0]}
                        className="hover:opacity-80 transition-opacity duration-200"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-center text-gray-500 text-sm mt-4">
                  *Profit potential based on average franchise performance
                </p>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="text-center mt-6">
              <button
                onClick={handleOpenForm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Apply for Franchise
              </button>
            </div>
          </div>

          {/* Right: ROI Calculator (Desktop) */}
          <div className="flex-1 relative hidden md:flex">
            <div className="absolute inset-0 bg-gradient-to-r from-cleancraft-light/40 to-cleancraft-light/20 rounded-2xl"></div>
            <div className="relative flex items-center justify-center w-full">
              <LaundryRoiCalculator />
            </div>
          </div>
        </div>

        {/* Mobile ROI Calculator */}
        <div
          className="md:hidden franchise-fade-in mt-10"
          style={{ animationDelay: "0.3s" }}
        >
          <LaundryRoiCalculator />
        </div>
      </div>

      {/* Modal */}
      <FranchiseFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Get Your Franchise Information Package"
        sourceCta="Apply for Franchise"
      />
    </section>
  );
};

export default WhyCleancraft;
