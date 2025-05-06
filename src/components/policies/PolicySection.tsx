
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PolicySectionProps {
  title: string;
  number: number;
  children: React.ReactNode;
}

const PolicySection: React.FC<PolicySectionProps> = ({ title, number, children }) => {
  return (
    <Card className="mb-6 border-l-4 border-l-google-blue shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <span className="bg-google-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
            {number}
          </span>
          <span className="text-xl font-medium text-gray-800">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 text-gray-600 leading-relaxed">
        {children}
      </CardContent>
    </Card>
  );
};

export default PolicySection;
