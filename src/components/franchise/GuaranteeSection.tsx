import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Shield,
  Clock,
  Award,
  Zap,
  Users,
  BarChart3,
  FileCheck,
  PackageCheck,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef, useState } from "react";
import FranchiseFormModal from "./FranchiseFormModal";

const GuaranteeSection = () => {
  const isMobile = useIsMobile();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleClaimTerritory = () => {
    setIsFormOpen(true);
  };

  const handleNextScroll = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };

  const guarantees = [
    {
      icon: <Users className="h-8 w-8 text-google-blue" />,
      title: "1000+ Customers in Year One",
      subtitle: "Or We Cover Your Next 6 Months of Marketing.",
      description:
        "We're so confident in your success, we promise: if your store doesn't serve 1000+ customers in the first year, we'll run your marketing for free for the next 6 months.",
    },
    {
      icon: <FileCheck className="h-8 w-8 text-google-red" />,
      title: "Cutting-Edge Tech",
      subtitle: "Or No Software Fees, Ever.",
      description:
        "Our world-class laundry tech runs like clockwork. But if our system doesn't simplify your operations, you won't pay a single rupee for the platform.",
    },
    {
      icon: <Award className="h-8 w-8 text-google-yellow" />,
      title: "Best-in-Class Detergents",
      subtitle: "Just 2ml per Garment Or ₹1 Lakh Detergent Free.",
      description:
        "We've cracked the perfect formula. If you don't experience top-tier quality with minimal usage, we'll supply your detergent stock worth ₹1,00,000 — free.",
    },
    {
      icon: <Zap className="h-8 w-8 text-google-green" />,
      title: "Introducing Pappy Wash™ 2025",
      subtitle:
        "The Smartest Machine Wash Program Or get a 100% Machine service for two years.",
      description:
        "Our exclusive Pappy Wash™ washes every piece of cloth according to need, hence super quality and no re-wash. hence repeated customers",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-google-blue" />,
      title: "Franchise Partner Training with Real Trade Secrets",
      subtitle: "Or We'll Pay Your Staff's Salary.",
      description:
        "Our partners don't just learn – they master. If you don't get training, we will pay for your staff till you don't get trained",
    },
    {
      icon: <Clock className="h-8 w-8 text-google-red" />,
      title: "Store Launch in 30 Days",
      subtitle: "Or We Pay Your Rent.",
      description:
        "From interior to equipment, we promise a lightning-fast launch. If we delay, we'll pay your monthly rent ourselves.",
    },
    {
      icon: <Shield className="h-8 w-8 text-google-yellow" />,
      title: "No Hidden Costs",
      subtitle:
        "100% Transparency, No Hidden Charges – Or Full Franchise Fee Refund",
      description:
        "If we charge you any hidden costs. We'll refund your entire franchise fee — no questions asked.",
    },
    {
      icon: <PackageCheck className="h-8 w-8 text-google-green" />,
      title: "Lowest Per-Piece Processing Cost in India",
      subtitle: "Or ₹1 Lakh Worth of Free Packaging & Consumables.",
      description:
        "We guarantee unmatched per-piece cost efficiency. If not, we'll give you ₹1,00,000 in free packaging and consumables.",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-google-blue" />,
      title: "Assured Break-Even in 7 Months",
      subtitle: "Or You'll Never Pay Royalty Again.",
      description:
        "If your outlet doesn't break even within 7 months (with our support), you'll enjoy a lifetime of 0% royalty.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="guarantees" className="section-padding bg-white">
      <div className="container-custom">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge className="bg-google-blue text-white mb-4 hover:bg-google-blue/90 px-4 py-1.5">
            Our Promise To You
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-google-gray">
            CleanCraft{" "}
            <span className="text-google-blue">Partner Guarantee</span>
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            <span className="text-google-red font-medium">Humble Request:</span>{" "}
            Don't ask these guarantees from our competitors, or they will hang
            up
          </p>
          <div className="bg-gradient-to-r from-white to-google-blue/5 p-6 rounded-xl border border-google-blue/10 shadow-sm mb-8">
            <p className="text-xl md:text-2xl font-normal text-google-gray">
              We have won a war, only small battles are left. We have worked so
              hard that we can proudly say
              <span className="font-semibold text-google-blue block mt-1">
                "we don't fear our competitors"
              </span>
            </p>
          </div>
        </motion.div>

        {/* Mobile view */}
        {isMobile ? (
          <div className="relative">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory no-scrollbar"
              ref={carouselRef}
            >
              {guarantees.map((guarantee, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="snap-center min-w-[300px] max-w-[300px] flex-shrink-0"
                >
                  <Card className="h-full border-0 hover:shadow-md transition-all duration-300 bg-white overflow-hidden hover:scale-[1.02] group">
                    <div className="p-6">
                      <div className="bg-google-blue/5 p-4 rounded-lg mb-5 w-16 h-16 flex items-center justify-center group-hover:bg-google-blue/10 transition-colors duration-300">
                        {guarantee.icon}
                      </div>
                      <h3 className="font-bold text-xl text-google-gray mb-2 group-hover:text-google-blue transition-colors duration-300">
                        {guarantee.title}
                      </h3>
                      <p className="text-google-blue font-medium mb-4">
                        {guarantee.subtitle}
                      </p>
                      <p className="text-gray-600">{guarantee.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Button */}
            {/* Swipe Text */}
            <p className="text-center text-sm text-gray-500 mb-2">
              👉 Swipe left for 9 Guarantees
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleNextScroll}
                className="bg-google-blue text-white rounded-full p-3 shadow hover:bg-google-blue/90 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          // Desktop Grid
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {guarantees.map((guarantee, index) => (
              <motion.div key={index} variants={item}>
                <Card className="h-full border-0 hover:shadow-md transition-all duration-300 bg-white overflow-hidden hover:scale-[1.02] group">
                  <div className="p-6">
                    <div className="bg-google-blue/5 p-4 rounded-lg mb-5 w-16 h-16 flex items-center justify-center group-hover:bg-google-blue/10 transition-colors duration-300">
                      {guarantee.icon}
                    </div>
                    <h3 className="font-bold text-xl text-google-gray mb-2 group-hover:text-google-blue transition-colors duration-300">
                      {guarantee.title}
                    </h3>
                    <p className="text-google-blue font-medium mb-4">
                      {guarantee.subtitle}
                    </p>
                    <p className="text-gray-600">{guarantee.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-16 rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="bg-google-blue text-white p-8 text-center">
            <h3
              className="text-3xl font-bold mb-4  text-white"
              style={{ color: "#fff" }}
            >
              Ready to become our next success story?
            </h3>
            <p
              className="text-white mb-6 max-w-2xl mx-auto"
              style={{ color: "#fff" }}
            >
              Join the family of entrepreneurs who are building wealth with our
              industry-leading guarantees.
            </p>
            <div className="flex flex-col items-center">
              <button
                onClick={handleClaimTerritory}
                className="inline-flex items-center justify-center bg-white text-blue-600 font-semibold rounded-full shadow-md transition-all duration-300 cursor-pointer select-none group px-6 py-3"
              >
                Claim Your Territory Today
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <p
                className="text-white/80 mt-4 italic text-sm"
                style={{ color: "#fff" }}
              >
                Stop Watching Others Win – It's Your Turn to Take the Leap.
              </p>
            </div>
          </div>
        </motion.div>

        <FranchiseFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title="Claim Your Premium Territory"
          sourceCta="Claim Territory"
        />
      </div>
    </section>
  );
};

export default GuaranteeSection;
