import { Metadata } from "next";
import ServiceCard from "@/features/services/components/ServiceCard";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionistku.vercel.app";

export const metadata: Metadata = {
  title: "Pricing & Services | Nutrition Plans Starting from Rp 500.000/month",
  description:
    "Explore our nutrition services and pricing plans. Choose from Basic (Rp 500K), Premium (Rp 1.2M), or Elite (Rp 2.5M) plans. All include personalized meal plans and expert guidance from certified nutritionists.",
  keywords: [
    "nutrition pricing",
    "diet plan cost",
    "nutritionist services",
    "meal plan pricing",
    "nutrition consultation fee",
    "affordable nutritionist",
    "personalized diet plan",
  ],
  openGraph: {
    title:
      "Pricing & Services | Nutrition Plans Starting from Rp 500.000/month",
    description:
      "Explore our nutrition services and pricing plans. Choose from Basic, Premium, or Elite plans with personalized meal plans.",
    url: `${siteUrl}/services`,
    siteName: "Nutritionist",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: `${siteUrl}/og-image-services.jpg`,
        width: 1200,
        height: 630,
        alt: "Nutritionist Pricing & Services",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Services | Nutrition Plans Starting from Rp 500K/month",
    description:
      "Explore our nutrition services and pricing plans. Choose from Basic, Premium, or Elite plans.",
    images: [`${siteUrl}/og-image-services.jpg`],
    creator: "@nutritionist",
  },
  alternates: {
    canonical: `${siteUrl}/services`,
  },
};

export default function PricingPage() {
  return (
    <main role="main">
      <ServiceCard />
    </main>
  );
}
