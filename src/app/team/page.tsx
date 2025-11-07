import { Metadata } from "next";
import TeamFetching from "@/features/team/components/TeamFetching";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionistku.vercel.app";

export const metadata: Metadata = {
  title: "Our Expert Team | Certified Nutritionists & Dietitians",
  description:
    "Meet our team of certified nutritionists, dietitians, and wellness experts dedicated to helping you achieve your health goals. Professional, experienced, and caring nutrition specialists.",
  keywords: [
    "certified nutritionist",
    "dietitian team",
    "nutrition experts",
    "wellness consultants",
    "health coaches",
    "professional nutritionists",
  ],
  openGraph: {
    title: "Our Expert Team | Certified Nutritionists & Dietitians",
    description:
      "Meet our team of certified nutritionists and dietitians dedicated to helping you achieve your wellness goals.",
    url: `${siteUrl}/team`,
    siteName: "Nutritionist",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: `${siteUrl}/og-image-team.jpg`,
        width: 1200,
        height: 630,
        alt: "Nutritionist Expert Team",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Expert Team | Certified Nutritionists & Dietitians",
    description:
      "Meet our team of certified nutritionists and dietitians dedicated to your wellness goals.",
    images: [`${siteUrl}/og-image-team.jpg`],
    creator: "@nutritionist",
  },
  alternates: {
    canonical: `${siteUrl}/team`,
  },
};

export const revalidate = 3600;

export default async function TeamPage() {
  return (
    <main role="main">
      <TeamFetching />
    </main>
  );
}
