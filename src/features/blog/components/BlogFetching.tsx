import Backendless from "@/utils/backendless";
import { Blog } from "@/lib/types";

async function getBlogs(): Promise<Blog[]> {
  try {
    // fetch all blog without pagination limit
    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setSortBy(["created desc"]);
    queryBuilder.setPageSize(100);

    const response = await Backendless.Data.of("Blogs").find<Blog>(
      queryBuilder
    );

    // validate response
    if (!Array.isArray(response)) {
      console.warn("⚠️ Backendless returned non-array:", typeof response);
      return [];
    }

    // Filter out invalid blogs
    const validBlogs = response.filter((blog): blog is Blog => {
      return (
        blog &&
        typeof blog === "object" &&
        "title" in blog &&
        "slug" in blog &&
        "content" in blog
      );
    });

    console.log(`✅ Fetched ${validBlogs.length} valid blogs`);
    return validBlogs;
  } catch (error) {
    console.error("Error fetching blogs data:", error);
    return [];
  }
}

interface BlogFetchingProps {
  children: (blogs: Blog[]) => React.ReactNode;
}

export default async function BlogFetching({ children }: BlogFetchingProps) {
  const blogs = await getBlogs();
  return <>{children(blogs)}</>;
}
