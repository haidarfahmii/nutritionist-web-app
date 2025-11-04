"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react"; // Quote icon for styling

// 5 Dummy testimonials for testing
const testimonials = [
  {
    quote:
      "I can't thank Nutritionist enough for their personalized nutrition coaching. It has completely transformed my approach to food and helped me shed those extra pounds. Highly recommended!",
    name: "Jennifer Anderson",
    avatarSrc: "/images/testi-person-1.svg",
  },
  {
    quote:
      "Nutritionist has been a game-changer for me. The expert guidance and support I received from their team made my weight loss journey so much easier. Thank you!",
    name: "Robert Johnson",
    avatarSrc: "/images/testi-person-2.svg",
  },
  {
    quote:
      "I had struggled with my weight for years until I found Nutritionist. Their personalized approach and tailored nutrition plan made all the difference. I've never felt better!",
    name: "Emily Davis",
    avatarSrc: "/images/testi-person-3.svg",
  },
  {
    quote:
      "Their team made my journey smoother. With the personalized nutrition plan and continuous support, I achieved my goals effortlessly.",
    name: "Sophia Lee",
    avatarSrc: "/images/testi-person-4.svg",
  },
  {
    quote:
      "Nutritionist really helped me understand how nutrition impacts my lifestyle. I feel more energetic and healthier.",
    name: "James Brown",
    avatarSrc: "/images/testi-person-5.svg",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
    );
  };

  return (
    <section className="w-full bg-background py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16 lg:mb-24"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Our Testimonials
          </h2>
          <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
            Our satisfied clients share their success stories and experiences on
            their journey to better health and well-being.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Testimonials Slider */}
          <motion.div
            className="flex transition-all duration-500"
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Sliding through 3 testimonials at a time */}
            {testimonials
              .slice(currentIndex, currentIndex + 3)
              .map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-xl p-8 flex flex-col w-full mx-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Quote className="h-10 w-10 text-primary mb-6" />
                  <p className="text-muted-foreground text-lg leading-relaxed flex-1 mb-8">
                    {item.quote}
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-border">
                    <Image
                      src={item.avatarSrc}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-lg font-semibold text-foreground">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-primary p-3 rounded-full shadow-md"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-primary p-3 rounded-full shadow-md"
          >
            &#10095;
          </button>
        </motion.div>
      </div>
    </section>
  );
}
