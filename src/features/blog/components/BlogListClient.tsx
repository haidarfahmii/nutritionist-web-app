"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BlogCard } from "./BlogCard";
import { BlogFilters } from "./BlogFilters";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
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

const BLOGS_PER_PAGE = 9;

const BLOG_CATEGORIES = [
  "Diet & Nutrition",
  "Weight Loss",
  "Healthy Recipes",
  "Fitness & Exercise",
  "Lifestyle",
  "Supplements",
  "Wellness Tips",
];

export function BlogListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();

  // State untuk UI controls
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  // State untuk data dari server
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    pageSize: BLOGS_PER_PAGE,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data dari server
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters
        const params = new URLSearchParams({
          page: currentPage.toString(),
          pageSize: BLOGS_PER_PAGE.toString(),
        });

        if (selectedCategory && selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }

        if (searchQuery.trim()) {
          params.append("search", searchQuery.trim());
        }

        // Fetch dari API route
        const response = await axiosInstance.get(`/api/blog/list?${params}`);

        if (response.data.success) {
          setBlogs(response.data.data.blogs);
          setPagination(response.data.data.pagination);
        } else {
          setError(response.data.message || "Failed to load blogs");
          toast.error(response.data.message || "Failed to load blogs");
        }
      } catch (err: any) {
        console.error("Error fetching blogs:", err);
        setError(err.message || "An error occurred while loading blogs");
        toast.error("Failed to load blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, selectedCategory, searchQuery]);

  // Update URL params ketika filter berubah
  useEffect(() => {
    const params = new URLSearchParams();

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    if (selectedCategory && selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }

    const newUrl = params.toString() ? `/blog?${params}` : "/blog";
    router.replace(newUrl, { scroll: false });
  }, [currentPage, selectedCategory, searchQuery, router]);

  // Handlers untuk filter
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateClick = () => {
    if (isAuthenticated) {
      router.push("/blog/create");
    } else {
      router.push("/login?redirect=/blog");
    }
  };

  return (
    <section id="blogs" className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 fade-in">
          <div>
            <h2 className="mb-2 text-2xl lg:text-3xl font-bold">
              Blog & Articles
            </h2>
            <p className="text-muted-foreground">
              Discover expert tips, recipes, and insights for your health
              journey
            </p>
          </div>
          <Button
            onClick={handleCreateClick}
            size="lg"
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Blog
          </Button>
        </div>

        <div className="fade-in-delay-1">
          <BlogFilters
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            categories={BLOG_CATEGORIES}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {blogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-delay-2">
                  {blogs.map((blog) => (
                    <BlogCard
                      key={blog.objectId || blog.slug}
                      slug={blog.slug}
                      title={blog.title}
                      image={blog.image}
                      author={blog.author}
                      description={blog.description}
                      category={blog.category}
                      created={blog.created}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex flex-col items-center gap-4 mt-12">
                    {/* Page Info */}
                    <p className="text-sm text-muted-foreground">
                      Showing{" "}
                      {(pagination.currentPage - 1) * pagination.pageSize + 1}{" "}
                      to{" "}
                      {Math.min(
                        pagination.currentPage * pagination.pageSize,
                        pagination.totalItems
                      )}{" "}
                      of {pagination.totalItems} articles
                    </p>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handlePageChange(pagination.currentPage - 1)
                        }
                        disabled={!pagination.hasPrevPage}
                        className="h-10 w-10"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: pagination.totalPages },
                          (_, i) => i + 1
                        ).map((page) => {
                          const showPage =
                            page === 1 ||
                            page === pagination.totalPages ||
                            Math.abs(page - pagination.currentPage) <= 1;

                          const showEllipsisBefore =
                            page === pagination.currentPage - 2 &&
                            pagination.currentPage > 3;
                          const showEllipsisAfter =
                            page === pagination.currentPage + 2 &&
                            pagination.currentPage < pagination.totalPages - 2;

                          if (showEllipsisBefore || showEllipsisAfter) {
                            return (
                              <span
                                key={page}
                                className="px-2 text-muted-foreground"
                              >
                                ...
                              </span>
                            );
                          }

                          if (!showPage) return null;

                          return (
                            <Button
                              key={page}
                              variant={
                                pagination.currentPage === page
                                  ? "default"
                                  : "outline"
                              }
                              size="icon"
                              onClick={() => handlePageChange(page)}
                              className="h-10 w-10"
                              aria-label={`Go to page ${page}`}
                              aria-current={
                                pagination.currentPage === page
                                  ? "page"
                                  : undefined
                              }
                            >
                              {page}
                            </Button>
                          );
                        })}
                      </div>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handlePageChange(pagination.currentPage + 1)
                        }
                        disabled={!pagination.hasNextPage}
                        className="h-10 w-10"
                        aria-label="Next page"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No blogs found matching your criteria.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
