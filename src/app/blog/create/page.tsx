import { Metadata } from "next";
import { FormCreateBlog } from "@/features/blog/components/FormCreateBlog";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionistku.vercel.app";

export const metadata: Metadata = {
  title: "Create Blog Post | Share Your Nutrition Knowledge",
  description:
    "Create and publish a new blog post to share your nutrition knowledge and expertise with our community.",
  robots: {
    index: false, // Don't index create page
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/blog/create`,
  },
};

export default function CreateBlogPage() {
  return (
    <main role="main" className="min-h-screen py-16 px-4">
      <div className="container mx-auto fade-in">
        <FormCreateBlog />
      </div>
    </main>
  );
}
