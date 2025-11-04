"use client";

import { motion } from "motion/react";
import { ArrowRight, Calendar, User } from "lucide-react";
import { fadeInUp, hoverScale, tapScale } from "@/lib/animations";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/lib/blog-utils";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      transition={{ delay: index * 0.1 }}
      whileHover={hoverScale}
      whileTap={tapScale}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
    >
      <div className="relative h-48 md:h-56 overflow-hidden">
        <ImageWithFallback
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <Badge className="mb-3 bg-[#CBEA7B] text-[#234338] hover:bg-[#B8D96D]">
          {post.category}
        </Badge>

        <h3 className="mb-3 line-clamp-2 group-hover:text-[#234338]/80 transition-colors duration-200">
          {post.title}
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
          {post.description}
        </p>

        {/* Author and Date */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {post.author?.name && (
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>{post.author?.name}</span>
            </div>
          )}
          {post.created && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.created)}</span>
            </div>
          )}
        </div>

        {/* Arrow Icon Link */}
        <div className="flex items-center justify-end">
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-[#234338] group-hover:text-[#CBEA7B] transition-colors duration-200"
          >
            <span className="text-sm">View Details</span>
            <ArrowRight className="h-5 w-5" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
