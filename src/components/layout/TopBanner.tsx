"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    // <motion.div
    //   initial={{ height: 0, opacity: 0 }}
    //   animate={{ height: "auto", opacity: 1 }}
    //   exit={{ height: 0, opacity: 0 }}
    //   className="self-stretch bg-[#1a3129] border-[#234338] border-solid border-b flex flex-col items-start py-6 px-8"
    // >
    //   <div className="self-stretch rounded-lg bg-[#234338] border-[#2c5446] border-solid border overflow-hidden flex items-center justify-center py-5 px-8 relative gap-5">
    //     <div className="flex items-center gap-1.5 z-0 shrink-0">
    //       <Image
    //         src="/icons/cricket.svg"
    //         width={24}
    //         height={24}
    //         sizes="100vw"
    //         alt="abstacr left"
    //         className="h-6 w-6 relative"
    //       />
    //       <div className="relative font-medium">
    //         Join Our Personalized Nutrition Demo For Free
    //       </div>
    //     </div>
    //     <Image
    //       src="/icons/arrow.svg"
    //       width={24}
    //       height={24}
    //       sizes="100vw"
    //       alt="abstract right"
    //       className="h-6 w-6 relative z-1 shrink-0"
    //     />
    //     <Image
    //       src="/icons/abstract-left.svg"
    //       className="absolute !!m-[0 important] top-[calc(50%-46px)] left-10 z-2 shrink-0"
    //       width={194.2}
    //       height={100}
    //       sizes="100vw"
    //       alt="abstract left"
    //     />
    //     <div className="absolute !!m-[0 important] top-[calc(50%-46px)] right-[39.8px] overflow-hidden flex items-center justify-center z-3 shrink-0">
    //       <Image
    //         src="/icons/abstract-right.svg"
    //         className="h-full w-full object-cover absolute left-0 top-0 transform-[scale(1)]"
    //         width={194.2}
    //         height={100}
    //         sizes="100vw"
    //         alt="abstract right"
    //       />
    //     </div>
    //   </div>
    //   {/* Close button */}
    //   <button
    //     onClick={() => setIsVisible(false)}
    //     className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors duration-200"
    //     aria-label="Close banner"
    //   >
    //     <X className="w-4 h-4" />
    //   </button>
    // </motion.div>
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-[#1a3129] text-white relative overflow-hidden"
    >
      {/* Decorative background patterns */}
      <div className="absolute left-0 top-0 w-32 h-full opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <pattern
            id="diagonal-left"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="20"
              x2="20"
              y2="0"
              stroke="#CBEA7B"
              strokeWidth="2"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#diagonal-left)" />
        </svg>
      </div>

      <div className="absolute right-0 top-0 w-32 h-full opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <pattern
            id="diagonal-right"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="20"
              y2="20"
              stroke="#CBEA7B"
              strokeWidth="2"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#diagonal-right)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-3 relative z-10">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base">
          <span className="inline-flex items-center gap-2">
            <span className="hidden sm:inline">🌿</span>
            <span>Join Our Personalized Nutrition Demo For Free</span>
          </span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors duration-200"
        aria-label="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
