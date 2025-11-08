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

const plans = [
  {
    name: "Basic Plan",
    price: "Rp 500.000",
    period: "/month",
    description:
      "Perfect for getting started with professional nutrition guidance",
    features: [
      "Initial nutrition consultation (60 minutes)",
      "Basic personalized meal plan",
      "Weekly meal prep guidelines",
      "Email support (48-hour response)",
      "Access to recipe database",
      "Monthly progress check-in",
    ],
  },
  {
    name: "Premium Plan",
    price: "Rp 1.200.000",
    period: "/month",
    description: "Comprehensive support for serious health transformation",
    features: [
      "In-depth nutrition assessment (90 minutes)",
      "Fully personalized meal plan",
      "Customized workout recommendations",
      "Weekly follow-up consultations",
      "Priority email & chat support",
      "Access to recipe book & meal prep videos",
      "Supplement recommendations",
      "Bi-weekly progress tracking",
    ],
    popular: true,
  },
  {
    name: "Elite Plan",
    price: "Rp 2.500.000",
    period: "/month",
    description: "Premium experience with dedicated personal attention",
    features: [
      "Comprehensive health & lifestyle assessment",
      "Fully customized nutrition program",
      "Personalized fitness & wellness plan",
      "Daily check-ins & adjustments",
      "24/7 priority support (WhatsApp & Email)",
      "Complete recipe book & video library",
      "Supplement & lifestyle recommendations",
      "Weekly progress tracking & analysis",
      "Exclusive access to webinars & workshops",
      "Grocery shopping guide & meal prep service",
    ],
  },
];

export default function ServiceCard() {
  return (
    <section id="service" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-in">
          <h1 className="mb-4 text-4xl lg:text-5x font-bold">
            Pricing & Services
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-20">
            Choose the plan that best fits your health goals and budget. All
            plans include expert guidance from certified nutritionists.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-10">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`fade-in-delay-1 relative flex flex-col ${
                plan.popular ? "border-primary shadow-xl scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-6 py-2 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="mb-4">
                  {plan.description}
                </CardDescription>
                <div>
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto fade-in-delay-2">
          <h3 className="mb-4">Not Sure Which Plan is Right for You?</h3>
          <p className="text-muted-foreground mb-6">
            Book a free 15-minute consultation with one of our nutritionists to
            discuss your goals and find the perfect plan.
          </p>
          <Button size="lg">Schedule Free Consultation</Button>
        </div>
      </div>
    </section>
  );
}
