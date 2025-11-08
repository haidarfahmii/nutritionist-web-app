import { Metadata } from "next";
import { AboutHero } from "@/features/about/components/WelcomeSection";
import { StorySection } from "@/features/about/components/StorySection";
import ContentSection from "@/features/about/components/ContentSection";
import { aboutContentData } from "@/features/about/data/aboutContentData";
import AchievementsSection from "@/features/about/components/AchievmentsSection";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionistku.vercel.app";

export const metadata: Metadata = {
  title: "About Us - Our Story & Mission | Nutritionist",
  description:
    "Learn about Nutritionist's mission to transform lives through personalized nutrition. Meet our team of certified nutritionists dedicated to your health goals. 300+ successful transformations.",
  keywords: [
    "about nutritionist",
    "nutrition mission",
    "certified nutritionists",
    "nutrition story",
    "health transformation",
    "nutrition experts",
    "wellness team",
  ],
  openGraph: {
    title: "About Us - Our Story & Mission | Nutritionist",
    description:
      "Learn about Nutritionist's mission to transform lives through personalized nutrition. 300+ successful transformations.",
    url: `${siteUrl}/about`,
    siteName: "Nutritionist",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: `${siteUrl}/og-image-about.jpg`,
        width: 1200,
        height: 630,
        alt: "About Nutritionist - Our Story",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Our Story & Mission | Nutritionist",
    description:
      "Learn about Nutritionist's mission to transform lives through personalized nutrition. 300+ successful transformations.",
    images: [`${siteUrl}/og-image-about.jpg`],
    creator: "@nutritionist",
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <main role="main">
      <AboutHero />
      <StorySection />
      {aboutContentData.map((content) => (
        <ContentSection key={content.title} {...content} />
      ))}
      <AchievementsSection />
    </main>
  );
}
