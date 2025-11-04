"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Gunakan next/navigation
import { useDebounce } from "@/hooks/useDebounce"; // Asumsi Anda punya hook ini
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
  const pathname = usePathname(); // path saat ini: /blog

  // State di-inisialisasi dari prop (yang berasal dari searchParams server)
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Gunakan initialPosts untuk tampilan awal
  // State 'posts' ini hanya akan diperbarui saat navigasi terjadi
  const [posts] = useState<BlogPost[]>(initialPosts);

  // Debounce search query untuk mencegah request berlebihan
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Efek untuk memicu navigasi saat filter berubah
  useEffect(() => {
    // Jangan jalankan saat load awal jika nilainya sama
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

    // Ganti URL. Ini akan memicu `page.tsx` di server untuk refetch
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
      {/* Hapus <Header /> jika sudah ada di layout.tsx utama Anda */}
      <CategoryFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory} // Cukup update state
      />
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery} // Cukup update state
      />
      <div className="container mx-auto max-w-6xl">
        {/* BlogGrid sekarang selalu merender 'posts' yang diterima dari server */}
        <BlogGrid posts={posts} />
      </div>
      <CreateBlogButton />
    </>
  );
}
