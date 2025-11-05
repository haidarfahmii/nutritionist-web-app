"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { BlogPost, CATEGORIES } from "@/lib/blog-utils";
import { CategoryFilter } from "@/features/blog/components/CategoryFilter";
import { SearchBar } from "@/features/blog/components/SearchBar";
import { BlogGrid } from "@/features/blog/components/BlogGrid";
import { CreateBlogButton } from "@/features/blog/components/CreateBlogButton";

interface BlogPageContentProps {
  initialPosts: BlogPost[];
  initialCategory: string;
  initialSearch: string;
}

export function BlogPageContent({
  initialPosts,
  initialCategory,
  initialSearch,
}: BlogPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [posts] = useState<BlogPost[]>(initialPosts);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (
      activeCategory === initialCategory &&
      debouncedSearchQuery === initialSearch
    ) {
      return;
    }

    const params = new URLSearchParams();
    if (activeCategory !== "All") {
      params.set("category", activeCategory);
    }
    if (debouncedSearchQuery) {
      params.set("q", debouncedSearchQuery);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [
    activeCategory,
    debouncedSearchQuery,
    router,
    pathname,
    initialCategory,
    initialSearch,
  ]);

  return (
    <>
      <CategoryFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="container mx-auto max-w-6xl">
        <BlogGrid posts={posts} />
      </div>
      <CreateBlogButton />
    </>
  );
}
