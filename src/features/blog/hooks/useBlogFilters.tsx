"use client";

import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface Blog {
  objectId?: string;
  slug: string;
  title: string;
  image: string;
  author: string;
  description: string;
  content: string;
  category: string;
  created?: number;
}

export function useBlogFilters(blogs: Blog[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(blogs.map((blog) => blog.category)));
  }, [blogs]);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Filter by search query
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.author.toLowerCase().includes(query) ||
          blog.description.toLowerCase().includes(query) ||
          blog.content.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [blogs, selectedCategory, debouncedSearch]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredBlogs,
  };
}
