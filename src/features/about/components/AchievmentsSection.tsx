"use client";

import { Trophy, Users, Heart, Award } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "300+ Transformations",
    description:
      "We have helped over 300 individuals achieve their weight loss goals and maintain a healthier lifestyle through our personalized nutrition plans.",
    bgColor: "bg-[#CBEA7B]",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description:
      "Our commitment to delivering results has earned the trust of thousands of individuals who believe in our approach to nutrition and wellness.",
    bgColor: "bg-[#F6FBE9]",
  },
  {
    icon: Heart,
    title: "100% Client Satisfaction",
    description:
      "We take pride in our client satisfaction rate. Every client receives personalized attention and support throughout their journey.",
    bgColor: "bg-[#CBEA7B]",
  },
  {
    icon: Award,
    title: "Recognized for Excellence",
    description:
      "Our team of nutritionists has been recognized for excellence in the field and has received multiple awards for outstanding service.",
    bgColor: "bg-[#F6FBE9]",
  },
];

export default function AchievementsSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="mb-4">Company Achievements</h2>
            <div className="w-16 h-1 bg-[#CBEA7B] mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground max-w-3xl mx-auto">
              At Nutritionist, we are proud of our accomplishments and the
              positive impact we have made on the lives of our clients. Here are
              some of our notable achievements.
            </p>
          </div>

          {/* Achievement Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`${achievement.bgColor} rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-[#234338]" />
                    </div>
                    <div>
                      <h3 className="mb-3">{achievement.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
