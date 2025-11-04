"use client";

import { motion } from "motion/react";
import { Search, X } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="container mx-auto max-w-6xl px-4 mb-8"
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search blogs by title or content..."
          className="w-full pl-12 pr-12 py-4 rounded-lg border-2 border-[#CBEA7B]/30 bg-white focus:outline-none focus:border-[#CBEA7B] transition-colors duration-200"
        />
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-gray-400" />
          </motion.button>
        )}
      </div>
      {searchQuery && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 mt-2"
        >
          Searching for: <span className="font-medium">"{searchQuery}"</span>
        </motion.p>
      )}
    </motion.div>
  );
}
