import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const GuaranteeSection: React.FC = () => {
  return (
    <section className="py-0 px-6 md:px-12 lg:px-28 xl:px-32 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        whileHover={{
          scale: 1.02,
          y: -5,
          boxShadow: "0 12px 28px rgba(0, 0, 0, 0.1)",
        }}
        className="max-w-5xl py-10 px-4 mx-auto w-full shadow-lg border border-gray-300 rounded-sm transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="text-center md:text-left w-full">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 leading-tight">
              CleanCraft <br />
              <span className="text-blue-600">Guarantee</span>
            </h2>
          </div>
          <div className="space-y-4 text-center md:text-left w-full">
            <p className="text-lg md:text-xl leading-relaxed text-gray-800">
              Every order comes with our unbeatable guarantee. Not satisfied
              with the clean? We'll reclean your clothes for free — no questions
              asked!
            </p>
            <div className="flex justify-center md:justify-start">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-8 w-8 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default GuaranteeSection;
