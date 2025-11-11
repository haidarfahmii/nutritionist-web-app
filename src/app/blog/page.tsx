import { Metadata } from "next";
import { BlogListWrapper } from "@/features/blog/components/BlogListWrapper";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionistku.vercel.app";

export const metadata: Metadata = {
  title: "Blog & Articles | Expert Nutrition Tips & Healthy Recipes",
  description:
    "Read expert nutrition tips, healthy recipes, and wellness advice from certified nutritionists. Learn about diet plans, weight loss, fitness, and healthy lifestyle.",
  keywords: [
    "nutrition blog",
    "healthy recipes",
    "diet tips",
    "nutrition articles",
    "weight loss tips",
    "wellness blog",
    "healthy eating guide",
    "meal prep ideas",
  ],
  openGraph: {
    title: "Blog & Articles | Expert Nutrition Tips & Healthy Recipes",
    description:
      "Read expert nutrition tips, healthy recipes, and wellness advice from certified nutritionists.",
    url: `${siteUrl}/blog`,
    siteName: "Nutritionist",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: `${siteUrl}/og-image-blog.jpg`,
        width: 1200,
        height: 630,
        alt: "Nutritionist Blog - Expert Tips & Recipes",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Articles | Expert Nutrition Tips & Healthy Recipes",
    description:
      "Read expert nutrition tips, healthy recipes, and wellness advice from certified nutritionists.",
    images: [`${siteUrl}/og-image-blog.jpg`],
    creator: "@nutritionist",
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
    types: {
      "application/rss+xml": `${siteUrl}/blog/rss.xml`,
    },
  },
};

export default async function BlogPage() {
  return (
    <main role="main">
      <BlogListWrapper />
    </main>
  );
}
