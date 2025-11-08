"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  GraduationCap,
  Target,
  CalendarCheck,
  HeartPulse,
  BookMarked,
  type LucideIcon,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: ClipboardList,
    title: "Personalized Nutrition Plans",
    description:
      "Receive a tailored nutrition plan designed specifically for your body and goals. Our certified nutritionists will consider your unique needs, dietary preferences, and health conditions to create a plan that suits you best.",
  },
  {
    icon: GraduationCap,
    title: "Guidance from Certified Nutritionists",
    description:
      "Our team of experienced and certified nutritionists will provide professional guidance and support throughout your journey. They will answer your questions, address your concerns, and keep you motivated as you work towards your goals.",
  },
  {
    icon: Target,
    title: "Food Tracking and Analysis",
    description:
      "Effortlessly track your food intake using our user-friendly app. Our nutritionists will analyze your data to provide insights into your eating habits, help you identify areas for improvement, and make personalized recommendations.",
  },
  {
    icon: CalendarCheck,
    title: "Meal Planning and Recipes",
    description:
      "Access a vast collection of delicious and healthy recipes tailored to your dietary needs. Our nutritionists will also create personalized meal plans, making it easier for you to stay on track and enjoy nutritious meals.",
  },
  {
    icon: HeartPulse,
    title: "Lifestyle and Behavior Coaching",
    description:
      "Achieving sustainable results requires more than just a diet plan. Our nutritionists will work with you to develop healthy habits, address emotional eating, and provide strategies to overcome obstacles along the way.",
  },
  {
    icon: BookMarked,
    title: "Nutritional Education and Workshops",
    description:
      "Expand your knowledge of nutrition through informative articles and educational workshops. Our nutritionists will equip you with the knowledge and tools to make informed choices for long-term success.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-[#F6FBE9] py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-4xl lg:text-5xl font-bold"
          >
            Features
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-[#234338]/70 max-w-3xl mx-auto"
          >
            Welcome to the Blog of Nutritionist, your trusted source for
            insightful articles, tips, and expert advice on nutrition and
            wellness.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            // Ambil komponen Ikon dari array
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-linear-to-br from-[#CBEA7B] to-[#B8D96D] rounded-xl flex items-center justify-center mb-4 shrink-0">
                    {/* Render komponen Ikon di sini */}
                    <Icon className="text-[#234338]" size={28} />
                  </div>
                  <h3 className="mb-3 text-lg">{feature.title}</h3>
                </div>
                <p className="text-[#234338]/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
