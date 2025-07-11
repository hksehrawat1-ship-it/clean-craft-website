import { Check, X, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const franchiseCategories = [
  {
    name: "Laundry",
    lowInvestment: true,
    lowInvestmentDesc:
      "Initial investment typically 30-40% lower than other franchise options",
    quickBreakeven: true,
    quickBreakevenDesc: "Most owners see breakeven within 8-12 months",
    highProfit: true,
    highProfitDesc: "Margins of 35-40% compared to industry average of 15-20%",
    easyOperations: true,
    easyOperationsDesc:
      "Semi-automated systems require minimal staff and training",
    recurringRevenue: true,
    recurringRevenueDesc:
      "Subscription-based model ensures steady monthly cash flow",
    riskFactor: "Low",
    riskFactorDesc:
      "Essential service with consistent demand regardless of economic conditions",
    preferenceRank: 1,
    preferenceRankDesc:
      "Ranked #1 in investor preference due to ROI and stability",
  },
  {
    name: "Food",
    lowInvestment: false,
    lowInvestmentDesc:
      "Higher initial costs for kitchen equipment and food safety compliance",
    quickBreakeven: false,
    quickBreakevenDesc:
      "Average breakeven period of 18-24 months due to high competition",
    highProfit: true,
    highProfitDesc:
      "Good margins but inconsistent due to fluctuating food costs",
    easyOperations: false,
    easyOperationsDesc:
      "Requires specialized staff, training, and complex inventory management",
    recurringRevenue: false,
    recurringRevenueDesc:
      "Relies heavily on daily customer traffic with seasonal fluctuations",
    riskFactor: "High",
    riskFactorDesc:
      "High failure rate due to competition and changing consumer preferences",
    preferenceRank: 3,
    preferenceRankDesc:
      "Popular choice but higher risk profile reduces investor preference",
  },
  {
    name: "Preschool",
    lowInvestment: false,
    lowInvestmentDesc:
      "High initial capital for space, infrastructure and educational resources",
    quickBreakeven: false,
    quickBreakevenDesc: "Typically requires 24-36 months to reach breakeven",
    highProfit: true,
    highProfitDesc:
      "Good margins once established but longer path to profitability",
    easyOperations: false,
    easyOperationsDesc:
      "Requires qualified teachers, compliance with regulations and curriculum development",
    recurringRevenue: true,
    recurringRevenueDesc:
      "Term-based fee structure provides predictable revenue cycles",
    riskFactor: "Medium",
    riskFactorDesc:
      "Stable once established but faces challenges in economic downturns",
    preferenceRank: 4,
    preferenceRankDesc:
      "Meaningful business with good stability but higher complexity",
  },
  {
    name: "Beauty & Wellness",
    lowInvestment: true,
    lowInvestmentDesc:
      "Moderate setup costs but requires prime locations with higher rent",
    quickBreakeven: false,
    quickBreakevenDesc: "Average breakeven period of 14-18 months",
    highProfit: false,
    highProfitDesc:
      "Thin margins due to high operational costs and staff requirements",
    easyOperations: true,
    easyOperationsDesc:
      "Relatively straightforward operations but depends on skilled practitioners",
    recurringRevenue: true,
    recurringRevenueDesc:
      "Loyalty programs and memberships help create recurring revenue",
    riskFactor: "Medium",
    riskFactorDesc:
      "Vulnerable to trends and requires constant service innovation",
    preferenceRank: 5,
    preferenceRankDesc: "Growing sector but faces increasing competition",
  },
  {
    name: "Retail",
    lowInvestment: false,
    lowInvestmentDesc:
      "High initial inventory costs and premium location requirements",
    quickBreakeven: false,
    quickBreakevenDesc: "Typically takes 18-24 months to break even",
    highProfit: false,
    highProfitDesc:
      "Low margins (10-15%) due to price competition and discounting",
    easyOperations: true,
    easyOperationsDesc:
      "Straightforward operations but requires inventory management skills",
    recurringRevenue: false,
    recurringRevenueDesc: "Heavily dependent on seasonal sales and promotions",
    riskFactor: "High",
    riskFactorDesc:
      "Vulnerable to e-commerce disruption and changing shopping habits",
    preferenceRank: 2,
    preferenceRankDesc:
      "Traditional choice but increasingly challenging landscape",
  },
];

const ComparisonSection = () => {
  return (
    <section className="bg-gray-50 py-8">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            2025 Franchise <span className="gradient-text">Comparison</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See why laundry is the most preferred franchise business in 2025
          </p>
        </div>

        <div className="overflow-x-auto">
          <TooltipProvider>
            <Table className="border border-gray-200 bg-white rounded-lg shadow-md">
              <TableCaption className="text-base font-medium mt-4 caption-bottom">
                Laundry Franchise: #1 Choice for Entrepreneurs in 2025
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-gray-100 border-b">
                  <TableHead className="text-left w-1/6 font-bold text-gray-800">
                    Category
                  </TableHead>
                  <TableHead className="text-center font-bold text-gray-800">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center gap-1 cursor-help">
                          Low Investment
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Initial capital required to start the business
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead className="text-center font-bold text-gray-800">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center gap-1 cursor-help">
                          Quick Breakeven
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Time taken to recover initial investment
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead className="text-center font-bold text-gray-800">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center gap-1 cursor-help">
                          High Profit
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Profit margins compared to industry averages
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead className="text-center font-bold text-gray-800">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center gap-1 cursor-help">
                          Easy Operations
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Complexity of day-to-day business management
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead className="text-center font-bold text-gray-800">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center gap-1 cursor-help">
                          Recurring Revenue
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Predictable income streams vs. one-time purchases
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead className="text-center font-bold text-gray-800">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center gap-1 cursor-help">
                          Risk Factor
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Overall business risk assessment
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead className="text-center font-bold text-gray-800">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center gap-1 cursor-help">
                          2025 Preference
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Investor ranking based on market research
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {franchiseCategories.map((category) => (
                  <TableRow
                    key={category.name}
                    className={cn(
                      "border-b hover:bg-gray-50 transition-colors",
                      category.name === "Laundry" && "bg-google-blue/5"
                    )}
                  >
                    <TableCell className="font-medium">
                      {category.name === "Laundry" ? (
                        <span className="font-bold text-google-blue">
                          {category.name}
                        </span>
                      ) : (
                        category.name
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="inline-flex justify-center w-full cursor-help">
                            {category.lowInvestment ? (
                              <Check className="h-5 w-5 text-google-green mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-google-red mx-auto" />
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            {category.lowInvestmentDesc}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="inline-flex justify-center w-full cursor-help">
                            {category.quickBreakeven ? (
                              <Check className="h-5 w-5 text-google-green mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-google-red mx-auto" />
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            {category.quickBreakevenDesc}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="inline-flex justify-center w-full cursor-help">
                            {category.highProfit ? (
                              <Check className="h-5 w-5 text-google-green mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-google-red mx-auto" />
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{category.highProfitDesc}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="inline-flex justify-center w-full cursor-help">
                            {category.easyOperations ? (
                              <Check className="h-5 w-5 text-google-green mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-google-red mx-auto" />
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            {category.easyOperationsDesc}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="inline-flex justify-center w-full cursor-help">
                            {category.recurringRevenue ? (
                              <Check className="h-5 w-5 text-google-green mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-google-red mx-auto" />
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            {category.recurringRevenueDesc}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="inline-flex justify-center w-full cursor-help">
                            <span
                              className={cn(
                                "font-medium",
                                category.riskFactor === "Low"
                                  ? "text-google-green"
                                  : category.riskFactor === "Medium"
                                  ? "text-google-yellow"
                                  : "text-google-red"
                              )}
                            >
                              {category.riskFactor}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{category.riskFactorDesc}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="inline-flex justify-center w-full cursor-help">
                            <span
                              className={cn(
                                "inline-block px-3 py-1 rounded-full text-white font-medium",
                                category.name === "Laundry"
                                  ? "bg-google-blue animate-pulse-soft"
                                  : category.preferenceRank <= 2
                                  ? "bg-google-green"
                                  : category.preferenceRank <= 4
                                  ? "bg-google-yellow"
                                  : "bg-google-red"
                              )}
                            >
                              #{category.preferenceRank}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            {category.preferenceRankDesc}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
