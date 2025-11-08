"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Basic",
    price: "Rp 500.000",
    period: "/month",
    features: ["Initial consultation", "Basic meal plan", "Email support"],
  },
  {
    name: "Premium",
    price: "Rp 1.200.000",
    period: "/month",
    features: [
      "In-depth consultation",
      "Personalized meal plan",
      "Weekly follow-ups",
      "Priority support",
      "Recipe book access",
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "Rp 2.500.000",
    period: "/month",
    features: [
      "Comprehensive assessment",
      "Fully customized program",
      "Daily check-ins",
      "24/7 support",
      "Recipe book & guides",
      "Supplement recommendations",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="services" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
            Choose the plan that best fits your health goals and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`fade-in-delay-1 relative ${
                plan.popular ? "border-primary shadow-lg" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/pricing" className="block">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 fade-in-delay-2">
          <Link href="/services">
            <Button size="lg" variant="outline" className="cursor-pointer">
              View All Service
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
