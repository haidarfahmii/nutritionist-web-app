"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    imgSrc: "/images/hero-blog-1.svg",
    category: "Weight Loss",
    title: "The Benefits of Hydration for Weight Loss",
    description:
      "Discover how staying hydrated can support your weight loss goals...",
    authorImg: "/images/blog-author-1.svg",
    authorName: "Emily Johnson",
    readTime: "5 min read",
  },
  {
    imgSrc: "/images/hero-blog-2.svg",
    category: "Mindful Eating",
    title: "Cultivating a Healthy Relationship with Food",
    description:
      "Learn how practicing mindful eating can help you develop a healthier relationship with food...",
    authorImg: "/images/blog-author-2.svg",
    authorName: "Sarah Thompson",
    readTime: "5 min read",
  },
  {
    imgSrc: "/images/hero-blog-3.svg",
    category: "Understanding Macronutrients",
    title: "Carbohydrates, Proteins, and Fats",
    description:
      "Get a comprehensive understanding of macronutrients and their role in your diet for optimal health...",
    authorImg: "/images/blog-author-3.svg",
    authorName: "Mark Wilson",
    readTime: "5 min read",
  },
  {
    imgSrc: "/images/hero-blog-4.svg",
    category: "Healthy Snacks",
    title: "Quick and Nutritious Options",
    description:
      "Explore a variety of convenient and healthy snack ideas to keep you fueled throughout the day...",
    authorImg: "/images/blog-author-4.svg",
    authorName: "Emily Johnson",
    readTime: "5 min read",
  },
];

export default function Blog() {
  return (
    <section className="w-full bg-secondary/30 py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16 lg:mb-24"
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Our Blogs
          </h2>
          <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
            Our blog is a treasure trove of informative and engaging articles
            written by our team of nutritionists, dietitians, and wellness
            experts.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-shadow hover:shadow-lg"
              variants={fadeIn("up", 0.3 + index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Link href="#" className="block">
                <Image
                  src={post.imgSrc}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </Link>
              <div className="p-6 lg:p-8">
                <div className="mb-4">
                  <span className="text-sm font-semibold text-dark-green py-2 px-3 bg-primary rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground mb-6">{post.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={post.authorImg}
                      alt={post.authorName}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-foreground">
                        {post.authorName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {post.readTime}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="group"
                    aria-label={`Read more about ${post.title}`}
                  >
                    <ArrowRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
