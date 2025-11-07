async function getBlogs() {
  try {
    // const baseUrl = process.env.API_BASE_URL || "http://localhost:3000";
    // const response = await fetch(`${baseUrl}/api/blog`, {
    //   cache: "no-store",
    // });

    // const data = await response.json();
    // return data?.data || [];
    const response = await Backendless.Data.of("Blogs").find({
      sortBy: ["created desc"],
    });
    return response || [];
  } catch (error) {
    console.error("Error fetching blogs data:", error);
    return [];
  }
}

interface BlogFetchingProps {
  children: (blogs: any[]) => React.ReactNode;
}

export default async function BlogFetching({ children }: BlogFetchingProps) {
  const blogs = await getBlogs();
  return <>{children(blogs)}</>;
}
