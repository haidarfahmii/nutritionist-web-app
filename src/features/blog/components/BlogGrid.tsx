"use client";

import { motion } from "motion/react";
import { Search } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { BlogPost } from "@/lib/blog-utils";
import { BlogCard } from "./BlogCard";

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center py-16 px-4"
      >
        <div className="max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBEA7B]/20 mb-4">
            <Search className="h-8 w-8 text-[#234338]" />
          </div>
          <h3 className="text-[#234338] mb-2">No blogs found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 pb-12"
    >
      {posts.map((post, index) => (
        <BlogCard key={post.objectId} post={post} index={index} />
      ))}
    </motion.div>
  );
}
