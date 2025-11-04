import { Suspense } from "react";
import { getBlogPosts } from "@/lib/blog-utils";
import { BlogPageContent } from "./BlogPageContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Blogs | Nutritionist",
  description:
    "Explore our collection of insightful articles, tips, and expert advice on nutrition and wellness.",
  keywords: "nutrition, wellness, healthy eating, weight loss, diet tips",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const currentCategory = searchParams.category;
  const currentQuery = searchParams.q;

  const initialPosts = await getBlogPosts(currentCategory, currentQuery);

  const initialCategory = currentCategory || "All";
  const initialSearch = currentQuery || "";

  return (
    <main className="min-h-screen bg-[#F6FBE9]">
      <Suspense fallback={<BlogPageSkeleton />}>
        <BlogPageContent
          initialPosts={initialPosts}
          initialCategory={initialCategory}
          initialSearch={initialSearch}
        />
      </Suspense>
    </main>
  );
}

function BlogPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#F6FBE9]">
      <div className="container mx-auto px-4 py-12">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
        <div className="h-4 w-96 bg-gray-200 rounded mx-auto mb-12 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 h-96 animate-pulse">
              <div className="h-48 bg-gray-200 rounded mb-4" />
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-6 w-full bg-gray-200 rounded mb-2" />
              <div className="h-4 w-full bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
