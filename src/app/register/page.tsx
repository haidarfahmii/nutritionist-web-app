import { Metadata } from "next";
import { FormRegister } from "@/features/auth/components/FormRegister";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionistku.vercel.app";

export const metadata: Metadata = {
  title: "Register | Start Your Nutrition Journey",
  description:
    "Create your Nutritionist account to get started with personalized meal plans, expert guidance, and professional nutrition support.",
  robots: {
    index: false, // Don't index register page
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/register`,
  },
};

export default function RegisterPage() {
  return (
    <main
      role="main"
      className="min-h-screen bg-linear-to-br from-background via-background to-secondary/20"
    >
      <FormRegister />
    </main>
  );
}
