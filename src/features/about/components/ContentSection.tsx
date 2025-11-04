"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ContentSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  backgroundColor?: "cream" | "white";
  showButton?: boolean;
}

export default function ContentSection({
  title,
  description,
  imageUrl,
  imageAlt,
  imagePosition = "left",
  backgroundColor = "cream",
  showButton = false,
}: ContentSectionProps) {
  const bgColor = backgroundColor === "cream" ? "bg-[#F6FBE9]" : "bg-white";
  const isImageLeft = imagePosition === "left";

  return (
    <section className={`${bgColor} py-12 md:py-16`}>
      <div className="container mx-auto px-4">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto ${
            isImageLeft ? "" : "lg:grid-flow-dense"
          }`}
        >
          {/* Image */}
          <div
            className={`${
              isImageLeft ? "" : "lg:col-start-2"
            } animate-fade-in-left`}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-4/3">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Content */}
          <div
            className={`${
              isImageLeft ? "" : "lg:col-start-1 lg:row-start-1"
            } animate-fade-in-right`}
          >
            <h2 className="mb-4">{title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {description}
            </p>
            {showButton && (
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-[#234338] hover:text-[#CBEA7B] transition-all duration-200 group"
              >
                <span>Read More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
