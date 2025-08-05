import React from "react";
import { motion } from "framer-motion";

const stats = [
  ["10k+", "Items Dry Cleaned"],
  ["100+", "Kgs Laundry"],
  ["10k+", "Shirts Laundered"],
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Trusted = () => {
  return (
    <div>
      <div className="w-full overflow-hidden mt-4 max:mt-10 py-6 px-4">
        <motion.div
          className="flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 py-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {stats.map(([count, label], idx) => (
            <motion.div
              key={idx}
              className="w-full lg:flex-1 text-center py-6 px-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
              style={{ backgroundColor: "rgb(232 241 253)" }}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                y: -4,
              }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-product-sans-black bg-gradient-to-r from-[#5294FF] to-[#003E8F] bg-clip-text text-transparent">
                {count}
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-[#0E0E0E] mt-1 sm:mt-2 leading-tight">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Trusted;
