import { Suspense } from "react";
import { getBlogPosts, BlogPost } from "@/lib/blog-utils";
import BlogPageClient from "@/features/blog/components/BlogPageClient";
import { BlogPageSkeleton } from "@/features/blog/components/BlogPageSkeleton";

// Force dynamic rendering untuk search params
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Blogs | Nutritionist",
  description:
    "Explore our collection of insightful articles, tips, and expert advice on nutrition and wellness.",
};

// interface BlogPageProps {
//   searchParams: Promise<{ category?: string; q?: string }>;
// }

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const currentCategory = await searchParams.category;
  const currentQuery = await searchParams.q;

  const complexPosts: any[] = await getBlogPosts(currentCategory, currentQuery);

  const initialPosts: BlogPost[] = complexPosts.map((post) => ({
    objectId: post.objectId,
    title: post.title,
    slug: post.slug,
    imageUrl: post.imageUrl,
    category: post.category,
    description: post.description,
    content: post.content,
    created: post.created,
    updated: post.updated,
    author: {
      objectId: post.author?.objectId || "unknown-author-id",
      name: post.author?.name || "Unknown Author",
    },
  }));

  const initialCategory = currentCategory || "All";
  const initialSearch = currentQuery || "";

  return (
    <main className="min-h-screen bg-[#F6FBE9]">
      <Suspense fallback={<BlogPageSkeleton />}>
        <BlogPageClient
          initialPosts={initialPosts}
          initialCategory={initialCategory}
          initialSearch={initialSearch}
        />
      </Suspense>
    </main>
  );
}
