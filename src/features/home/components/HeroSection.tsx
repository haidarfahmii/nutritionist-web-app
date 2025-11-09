"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  return (
    <section className="bg-background py-12 md:py-0 lg:py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="order-2 lg:order-1"
        >
          <Image
            src="/images/hero.png"
            alt="Woman smiling and pointing"
            width={950}
            height={830}
            className="w-full h-auto rounded-br-[50px] object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
            loading="eager"
          />
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="order-1 lg:order-2 space-y-6 py-3 px-3"
        >
          <motion.div variants={fadeInUp} className="inline-block">
            <div className="bg-white px-4 py-2 rounded-full inline-flex items-center gap-2 shadow-sm">
              <div className="w-2 h-2 bg-[#CBEA7B] rounded-full animate-pulse"></div>
              <span className="text-sm text-[#234338]">
                Transform Your ❤️ Health with
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="leading-tight text-3xl lg:text-4xl font-bold"
          >
            Personalised Nutrition Coaching
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-[#234338]/70 text-lg">
            Welcome to Nutritionist, your partner in achieving optimal health
            through personalized nutrition coaching. Our team of certified
            nutritionists is here to guide you on your weight loss journey,
            providing customized plans and ongoing support. Start your
            transformation today and experience the power of personalized
            nutrition coaching.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link href="#blog" aria-label="Get started with nutrition coaching">
              <Button className="bg-[#CBEA7B] text-[#234338] hover:bg-[#B8D96D] px-8 h-12 group cursor-pointer">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/services" aria-label="View our subscription services">
              <Button
                variant="outline"
                className="border-[#234338] text-[#234338] hover:bg-[#234338] hover:text-white px-8 h-12 cursor-pointer"
              >
                <Play className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </Link>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            variants={fadeInUp}
            className="pt-8 flex items-center gap-4"
          >
            <div className="flex items-center">
              <Image
                src="/images/avatar-1.png"
                alt=""
                width={50}
                height={50}
                className="relative object-cover rounded-full border-2 border-white"
                quality={75}
                loading="lazy"
                aria-hidden="true"
              />
              <Image
                src="/images/avatar-2.png"
                alt=""
                width={50}
                height={50}
                className="relative object-cover rounded-full border-2 border-white -ml-5"
                quality={75}
                loading="lazy"
                aria-hidden="true"
              />
              <Image
                src="/images/avatar-3.png"
                alt="Customer 3"
                width={50}
                height={50}
                className="relative object-cover rounded-full border-2 border-white -ml-5"
                quality={75}
                loading="lazy"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="font-semibold">
                <span className="text-[#234338]">430+ Happy Customers</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
