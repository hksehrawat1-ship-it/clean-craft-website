import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import EnhancedNavbar from "@/components/EnhancedNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import {
  CheckCircle2,
  CheckCircle,
  Phone,
  TrendingUp,
  BookOpenCheck,
  Clock,
  ClipboardCheck,
} from "lucide-react";
import ProgressiveStepper, {
  Step,
} from "@/components/franchise/ProgressiveStepper";

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const sourceCta = queryParams.get("sourceCta");
  const isCourse = sourceCta === "course";

  const franchiseSteps: Step[] = [
    {
      id: 1,
      title: "Information Submitted",
      description: "Your details are now in our system",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      id: 2,
      title: "Discovery Call Scheduled",
      description:
        "Within 24 hours - Our franchise consultant will contact you",
      icon: <Phone className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "Franchise Up & Running",
      description: "~₹1 lakh Rs monthly earning potential",
      icon: <TrendingUp className="h-6 w-6" />,
    },
  ];

  const courseSteps: Step[] = [
    {
      id: 1,
      title: "Course Registration Done",
      description: "You’ve successfully registered for the course",
      icon: <ClipboardCheck className="h-6 w-6" />,
    },
    {
      id: 2,
      title: "Details Shared",
      description: "We’ve emailed you the course instructions",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "Course WhatsApp group",
      description:
        "A group with all the students will be created 2 days before the course date.",
      icon: <BookOpenCheck className="h-6 w-6" />,
    },
  ];

  return (
    <>
      <EnhancedSEO
        slug="/thank-you"
        pageType="Organization"
        defaultTitle="Thank You | CleanCraft"
        defaultDescription="Thank you for your submission."
      />

      <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
        <EnhancedNavbar />

        <main className="flex-grow flex justify-center items-center px-4 py-16 relative z-10">
          <motion.div
            className="bg-white shadow-2xl border border-green-100 rounded-3xl p-10 max-w-md w-full text-center"
            animate={{ y: [0, -10, 0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 10,
                delay: 0.2,
              }}
              className="mb-4 flex justify-center"
            >
              <CheckCircle2 className="text-green-600 w-16 h-16" />
            </motion.div>

            <h1 className="text-3xl font-bold text-green-700 mb-4">
              Thank You!
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-6"
            >
              <ProgressiveStepper
                steps={isCourse ? courseSteps : franchiseSteps}
              />
            </motion.div>

            <Button
              onClick={() => navigate("/")}
              className="bg-green-600 hover:bg-green-700 text-white mt-4"
            >
              Go Back Home
            </Button>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ThankYouPage;
