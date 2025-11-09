import { Metadata } from "next";
import HeroSection from "@/features/home/components/HeroSection";
import BlogFetching from "@/features/blog/components/BlogFetching";
import BlogList from "@/features/home/components/BlogList";
import Pricing from "@/features/home/components/Pricing";
import Testimonoials from "@/features/home/components/Testimonials";
import Features from "@/features/home/components/Features";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionistku.vercel.app";

export const metadata: Metadata = {
  title: "Professional Nutritionist Services | Personalized Diet & Meal Plans",
  description:
    "Transform your health with expert nutrition coaching. Get personalized meal plans, diet guidance, and professional support from certified nutritionists. Start your wellness journey today.",
  keywords: [
    "nutritionist services",
    "personalized diet plan",
    "nutrition coaching",
    "meal planning",
    "weight loss program",
    "healthy eating",
    "certified nutritionist",
    "diet consultation",
    "wellness coaching",
  ],
  openGraph: {
    title:
      "Professional Nutritionist Services | Personalized Diet & Meal Plans",
    description:
      "Transform your health with expert nutrition coaching. Get personalized meal plans and professional support from certified nutritionists.",
    url: siteUrl,
    siteName: "Nutritionist",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Nutritionist - Professional Nutrition Services",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Professional Nutritionist Services | Personalized Diet & Meal Plans",
    description:
      "Transform your health with expert nutrition coaching. Get personalized meal plans from certified nutritionists.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@nutritionist",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function Home() {
  return (
    <main role="main">
      {/* Hero Section with h1 for SEO */}
      <HeroSection />

      {/* Features Section */}
      <Features />

      {/* Blog Section */}
      <BlogFetching>{(blogs) => <BlogList blogs={blogs} />}</BlogFetching>

      {/* Testimonials */}
      <Testimonoials />

      {/* Pricing Preview */}
      <Pricing />
    </main>
  );
}
