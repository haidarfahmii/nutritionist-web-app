"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import Link from "next/link";
import { Check } from "lucide-react"; // Icon for features

const pricingPlans = [
  {
    name: "Basic Plan",
    monthlyPrice: "$49",
    yearlyPrice: "$499", // Discounted yearly price
    description: "Get started on your health journey with our Basic Plan.",
    features: [
      "Personalized nutrition coaching",
      "Access to our app",
      "Meal planning assistance",
      "Email support",
    ],
    isPopular: false,
    ctaText: "Choose Plan",
  },
  {
    name: "Premium Plan",
    monthlyPrice: "$79",
    yearlyPrice: "$799", // Discounted yearly price
    description: "Upgrade to our Premium Plan for enhanced features.",
    features: [
      "All Basic Plan features",
      "Video consultations",
      "Priority support",
      "Personalized recipe recommendations",
    ],
    isPopular: true,
    ctaText: "Choose Plan",
  },
  {
    name: "Ultimate Plan",
    monthlyPrice: "$99",
    yearlyPrice: "$999", // Discounted yearly price
    description: "Experience the full benefits with our Ultimate Plan.",
    features: [
      "All Premium Plan features",
      "24/7 chat support",
      "Exclusive workshops",
      "Advanced progress tracking",
    ],
    isPopular: false,
    ctaText: "Choose Plan",
  },
];

export default function Pricing() {
  const [pricingType, setPricingType] = useState("monthly"); // Track monthly or yearly selection

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
            Our Pricing
          </h2>
          <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
            We outline our flexible and affordable options to support you on
            your journey to optimal health and nutrition.
          </p>
        </motion.div>

        {/* Pricing Toggle (Monthly / Yearly) */}
        <div className="text-center mb-8">
          <button
            onClick={() => setPricingType("monthly")}
            className={`${
              pricingType === "monthly"
                ? "bg-primary text-primary-foreground"
                : "bg-primary/10 text-primary-foreground"
            } px-8 py-3.5 rounded-lg text-base font-semibold transition-all duration-300 mr-4`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPricingType("yearly")}
            className={`${
              pricingType === "yearly"
                ? "bg-primary text-primary-foreground"
                : "bg-primary/10 text-primary-foreground"
            } px-8 py-3.5 rounded-lg text-base font-semibold transition-all duration-300`}
          >
            Yearly
          </button>
          <p className="mt-2 text-sm text-muted-foreground">
            Save 50% on Yearly
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-card border rounded-xl p-8 flex flex-col ${
                plan.isPopular
                  ? "border-primary shadow-xl"
                  : "border-border shadow-sm"
              }`}
              variants={fadeIn("up", 0.3 + index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
                <div className="my-8">
                  <span className="text-5xl font-bold text-foreground">
                    {pricingType === "monthly"
                      ? plan.monthlyPrice
                      : plan.yearlyPrice}
                  </span>
                  <span className="text-lg text-muted-foreground">
                    /{pricingType}
                  </span>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="#"
                className={`mt-10 w-full inline-flex items-center justify-center rounded-lg px-6 py-3.5 text-base font-semibold shadow-sm transition ${
                  plan.isPopular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-primary/10 text-primary-foreground hover:bg-primary/20"
                }`}
              >
                {plan.ctaText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
