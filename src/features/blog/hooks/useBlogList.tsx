"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "@/utils/axios-instance";
import { toast } from "react-toastify";

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

interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface UseBlogListParams {
  page: number;
  pageSize?: number;
  category?: string;
  search?: string;
}

interface UseBlogListReturn {
  blogs: Blog[];
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBlogList({
  page,
  pageSize = 9,
  category,
  search,
}: UseBlogListParams): UseBlogListReturn {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    pageSize,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: pageSize.toString(),
        });

        if (category && category !== "All") {
          params.append("category", category);
        }

        if (search?.trim()) {
          params.append("search", search.trim());
        }

        // Fetch dari API route
        const response = await axiosInstance.get(`/api/blog/list?${params}`);

        if (response.data.success) {
          setBlogs(response.data.data.blogs);
          setPagination(response.data.data.pagination);
        } else {
          const errorMsg = response.data.message || "Failed to load blogs";
          setError(errorMsg);
          toast.error(errorMsg);
        }
      } catch (err: any) {
        console.error("Error fetching blogs:", err);
        const errorMsg = err.message || "An error occurred while loading blogs";
        setError(errorMsg);
        toast.error("Failed to load blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page, pageSize, category, search, refetchTrigger]);

  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  return {
    blogs,
    pagination,
    loading,
    error,
    refetch,
  };
}
