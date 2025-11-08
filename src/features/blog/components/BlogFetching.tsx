import Backendless from "@/utils/backendless";
import { Blog } from "@/lib/types";

async function getBlogs(): Promise<Blog[]> {
  try {
    // const baseUrl = process.env.API_BASE_URL || "http://localhost:3000";
    // const response = await fetch(`${baseUrl}/api/blog`, {
    //   cache: "no-store",
    // });

    // const data = await response.json();
    // return data?.data || [];
    const response = await Backendless.Data.of("Blogs").find<Blog>({
      sortBy: ["created desc"],
    });

    // Validate response
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
