"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Blog({ blogs }: { blogs: any[] }) {
  const displayBlogs = blogs.slice(0, 4);

  return (
    <section id="blog" className="w-full bg-secondary/30 py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16 lg:mb-20"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our Blogs
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            Our blog is a treasure trove of informative and engaging articles
            written by our team of nutritionists, dietitians, and wellness
            experts.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {displayBlogs.map((blog, index) => (
            <motion.article
              key={blog.objectId || index}
              className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Image Container */}
              <Link
                href={`/blog/${blog.slug}`}
                className="block relative overflow-hidden"
                aria-label={`Read article: ${blog.title}`}
              >
                <div className="relative w-full h-60 lg:h-[280px]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={80}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              {/* Card Content */}
              <div className="p-6 flex flex-col grow">
                {/* Category Badge */}
                <div className="mb-3">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {blog.category}
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground line-clamp-2 leading-tight mb-3">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {blog.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-sm lg:text-base text-muted-foreground line-clamp-2 leading-relaxed mb-4 grow">
                  {blog.description}
                </p>

                {/* Meta Info & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <User
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate max-w-[100px]">
                        {blog.author}
                      </span>
                    </span>
                    {blog.created && (
                      <span className="flex items-center gap-1.5">
                        <Calendar
                          className="h-3.5 w-3.5 hrink-0"
                          aria-hidden="true"
                        />
                        <time
                          className="whitespace-nowrap"
                          dateTime={new Date(blog.created).toISOString()}
                        >
                          {formatDate(new Date(blog.created))}
                        </time>
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="group/arrow flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all shrink-0"
                    aria-label={`Read more about ${blog.title}`}
                  >
                    <span className="hidden sm:inline">Read</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover/arrow:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="mt-12 lg:mt-16 text-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
            aria-label="View all blog articles"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
