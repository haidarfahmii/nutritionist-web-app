"use client";

import { motion } from "motion/react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="bg-[#234338] py-4 px-4 mb-12"
    >
      <div className="container mx-auto">
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap gap-2 md:gap-4 justify-center"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeCategory === category
                  ? "bg-[#CBEA7B] text-[#234338]"
                  : "bg-transparent text-white hover:bg-[#2C5F2D]"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
