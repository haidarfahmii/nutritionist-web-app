import { Metadata } from "next";
import { FormLogin } from "@/features/auth/components/FormLogin";
import { Suspense } from "react";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionistku.vercel.app";

export const metadata: Metadata = {
  title: "Login | Access Your Nutrition Account",
  description:
    "Login to your Nutritionist account to access personalized meal plans, track your progress, and connect with your nutritionist.",
  robots: {
    index: false, // Don't index login page
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/login`,
  },
};

function LoginFallback() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main
      role="main"
      className="min-h-screen bg-linear-to-br from-background via-background to-secondary/20"
    >
      <Suspense fallback={<LoginFallback />}>
        <FormLogin />
      </Suspense>
    </main>
  );
}
