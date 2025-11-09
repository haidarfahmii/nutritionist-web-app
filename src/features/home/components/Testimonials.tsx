"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Client",
    avatar: "SJ",
    rating: 5,
    text: "NutriLife has completely transformed my relationship with food. The personalized meal plans are easy to follow and the results are amazing!",
  },
  {
    name: "Michael Chen",
    role: "Client",
    avatar: "MC",
    rating: 5,
    text: "Professional, knowledgeable, and genuinely caring. The nutritionists here really take the time to understand your goals and help you achieve them.",
  },
  {
    name: "Emily Davis",
    role: "Client",
    avatar: "ED",
    rating: 5,
    text: "I've tried many diet programs before, but NutriLife's approach is different. It's sustainable, practical, and actually enjoyable!",
  },
  {
    name: "David Wilson",
    role: "Client",
    avatar: "DW",
    rating: 5,
    text: "The support and guidance I received was exceptional. I've lost 30 pounds and feel healthier than ever!",
  },
  {
    name: "Jessica Brown",
    role: "Client",
    avatar: "JB",
    rating: 5,
    text: "Amazing experience! The nutrition plans are tailored perfectly to my lifestyle and dietary needs.",
  },
  {
    name: "Robert Taylor",
    role: "Client",
    avatar: "RT",
    rating: 5,
    text: "The team's expertise and dedication helped me achieve results I never thought possible. Highly recommended!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 3;

  // Calculate max index (last group of 3 cards)
  const maxIndex = Math.max(0, testimonials.length - cardsToShow);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  // Get visible testimonials
  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + cardsToShow
  );

  return (
    <section id="testimonials" className="w-full bg-background py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Testimonials
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            Our satisfied clients share their success stories and experiences on
            their journey to better health and well-being.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleTestimonials.map((testimonial, index) => (
                <Card
                  key={`${currentIndex}-${index}`}
                  className="border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="pt-6 pb-6 px-6">
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-primary text-primary"
                          />
                        )
                      )}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-sm text-foreground mb-6 leading-relaxed min-h-[120px]">
                      "{testimonial.text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons - Only show if more than 3 testimonials */}
          {testimonials.length > cardsToShow && (
            <>
              <Button
                onClick={prevSlide}
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all z-10 hidden lg:flex"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                onClick={nextSlide}
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all z-10 hidden lg:flex"
                aria-label="Next testimonials"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Mobile Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-8 lg:hidden">
                <Button
                  onClick={prevSlide}
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  onClick={nextSlide}
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  aria-label="Next testimonials"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`min-w-0 min-h-0 p-0 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
