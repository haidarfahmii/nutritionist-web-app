"use client";

import { BlogCard } from "./BlogCard";
import { BlogFilters } from "./BlogFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useBlogFilters } from "../hooks/useBlogFilters";

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

  const handleCreateClick = () => {
    if (isAuthenticated) {
      router.push("/blog/create");
    } else {
      router.push("/login?redirect=/blog");
    }
  };

  return (
    <section id="blogs" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8 fade-in">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-delay-2">
            {filteredBlogs.map((blog) => (
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
