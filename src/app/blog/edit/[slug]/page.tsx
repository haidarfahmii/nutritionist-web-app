import { Metadata } from "next";
import { FormEditBlog } from "@/features/blog/components/FormEditBlog";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blog-service";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionistku.vercel.app";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  return {
    title: `Edit: ${blog.title} | Nutritionist Blog`,
    description: `Edit blog post: ${blog.description}`,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/blog/edit/${blog.slug}`,
    },
  };
}

export default async function EditBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main role="main" className="min-h-screen py-16 px-4">
      <div className="container mx-auto fade-in">
        <FormEditBlog blog={blog} />
      </div>
    </main>
  );
}
