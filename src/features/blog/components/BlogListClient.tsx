"use client";

import { BlogCard } from "./BlogCard";
import { BlogFilters } from "./BlogFilters";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useBlogFilters } from "../hooks/useBlogFilters";
import { usePagination } from "../hooks/usePagination";

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

interface BlogListClientProps {
  blogs: Blog[];
}

const BLOGS_PER_PAGE = 9;

export function BlogListClient({ blogs }: BlogListClientProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredBlogs,
  } = useBlogFilters(blogs);

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
  } = usePagination(filteredBlogs, BLOGS_PER_PAGE);

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
            categories={categories}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {filteredBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-delay-2">
              {paginatedData.map((blog) => (
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

            {/* pagination control */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-12">
                {/* Page Info */}
                <p className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * BLOGS_PER_PAGE + 1} to{" "}
                  {Math.min(currentPage * BLOGS_PER_PAGE, filteredBlogs.length)}{" "}
                  of {filteredBlogs.length} articles
                </p>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevPage}
                    disabled={!canGoPrev}
                    className="h-10 w-10"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        // Show first page, last page, current page, and pages around current
                        const showPage =
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(page - currentPage) <= 1;

                        // Show ellipsis
                        const showEllipsisBefore =
                          page === currentPage - 2 && currentPage > 3;
                        const showEllipsisAfter =
                          page === currentPage + 2 &&
                          currentPage < totalPages - 2;

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
                              currentPage === page ? "default" : "outline"
                            }
                            size="icon"
                            onClick={() => goToPage(page)}
                            className="h-10 w-10"
                            aria-label={`Go to page ${page}`}
                            aria-current={
                              currentPage === page ? "page" : undefined
                            }
                          >
                            {page}
                          </Button>
                        );
                      }
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextPage}
                    disabled={!canGoNext}
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
      </div>
    </section>
  );
}
