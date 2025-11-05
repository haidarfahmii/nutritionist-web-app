"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { BlogPost, CATEGORIES } from "@/lib/blog-utils";
import { CategoryFilter } from "@/features/blog/components/CategoryFilter";
import { SearchBar } from "@/features/blog/components/SearchBar";
import { BlogGrid } from "@/features/blog/components/BlogGrid";
import { CreateBlogButton } from "@/features/blog/components/CreateBlogButton";

interface BlogPageClientProps {
  initialPosts: BlogPost[];
  initialCategory: string;
  initialSearch: string;
}

export default function BlogPageClient({
  initialPosts,
  initialCategory,
  initialSearch,
}: BlogPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // State untuk filter
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Update URL dan fetch data saat filter berubah
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Update params
    if (activeCategory !== "All") {
      params.set("category", activeCategory);
    } else {
      params.delete("category");
    }

    if (debouncedSearchQuery) {
      params.set("q", debouncedSearchQuery);
    } else {
      params.delete("q");
    }

    // Update URL dengan transition untuk smooth loading state
    startTransition(() => {
      router.push(`/blog?${params.toString()}`, { scroll: false });
    });

    // Fetch data baru
    fetchPosts(
      activeCategory !== "All" ? activeCategory : undefined,
      debouncedSearchQuery || undefined
    );
  }, [activeCategory, debouncedSearchQuery]);

  // Fungsi untuk fetch posts
  const fetchPosts = async (category?: string, query?: string) => {
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (query) params.set("q", query);

      const response = await fetch(`/api/blog?${params.toString()}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  return (
    <>
      <CategoryFilter
        categories={[...CATEGORIES]}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="container mx-auto max-w-6xl">
        {isPending ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[#CBEA7B] border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        ) : (
          <BlogGrid posts={posts} />
        )}
      </div>

      <CreateBlogButton />
    </>
  );
}
