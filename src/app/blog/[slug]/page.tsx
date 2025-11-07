import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Backendless from "@/utils/backendless";

export const dynamic = "force-dynamic";

// export async function generateMetadata({
//   params,
// }: BlogDetailPageProps): Promise<Metadata> {
//   const { slug } = params;
//   const blogs = await backendless.Data.of("Blogs").find({
//     where: `slug = '${slug}'`,
//   });

//   const blog = blogs[0] as Blog | undefined;

//   if (!blog) {
//     return {
//       title: "Blog Not Found",
//     };
//   }

//   const publishedTime = blog.created
//     ? new Date(blog.created).toISOString()
//     : new Date().toISOString();

//   return {
//     title: `${blog.title} | Nutritionist Blog`,
//     description: blog.description,
//     keywords: [
//       blog.category,
//       "nutrition",
//       "healthy eating",
//       "diet tips",
//       blog.author,
//       ...blog.title.split(" ").slice(0, 5),
//     ],
//     authors: [
//       {
//         name: blog.author,
//       },
//     ],
//     openGraph: {
//       title: blog.title,
//       description: blog.description,
//       url: `${siteUrl}/blog/${blog.slug}`,
//       siteName: "Nutritionist",
//       type: "article",
//       locale: "id_ID",
//       publishedTime,
//       authors: [blog.author],
//       tags: [blog.category, "nutrition", "healthy eating"],
//       images: [
//         {
//           url: blog.image,
//           width: 1200,
//           height: 630,
//           alt: blog.title,
//           type: "image/jpeg",
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: blog.title,
//       description: blog.description,
//       images: [blog.image],
//       creator: "@nutritionist",
//     },
//     alternates: {
//       canonical: `${siteUrl}/blog/${blog.slug}`,
//     },
//   };
// }
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionistku.vercel.app";

function getBaseUrl() {
  // Di production (Vercel)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fallback ke NEXT_PUBLIC_SITE_URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Fallback untuk development
  return "http://localhost:3000";
}

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

async function getBlog(slug: string) {
  try {
    // const safeSlug = slug.replace(/'/g, "''");
    // const queryBuilder = Backendless.DataQueryBuilder.create();
    // queryBuilder.setWhereClause(`slug='${safeSlug}'`);
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/blog/${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blog = await response.json();
    return blog?.data;
    // const response = await Backendless.Data.of("Blogs").findFirst(queryBuilder);
    // return response;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} | Nutritionist Blog`,
    description: blog.description,
    openGraph: {
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      description: blog.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | Nutritionist Blog`,
      description: blog.description,
      images: [blog.image],
      site: siteUrl,
      creator: "@nutritionist",
    },
  };
}

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const readingTime = calculateReadingTime(blog.content);

  return (
    <main role="main">
      <article className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <nav className="mb-8 fade-in" aria-label="Blog navigation">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </nav>

          {/* Featured Image */}
          <div className="mb-8 fade-in-delay-1">
            <img
              src={blog?.image}
              alt={blog?.title}
              width={1200}
              height={630}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Title & Meta */}
          <header className="mb-8 space-y-4 fade-in-delay-2">
            <Badge>{blog?.category}</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold">{blog?.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                By {blog?.author}
              </span>
              {blog.created && (
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(new Date(blog.created))}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </span>
            </div>
          </header>

          {/* Description */}
          <div className="mb-8 fade-in-delay-3">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {blog.description}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none fade-in-delay-3 dark:prose-invert">
            <p className="whitespace-pre-wrap leading-relaxed">
              {blog.content}
            </p>
          </div>

          {/* Back to Blog */}
          <footer className="mt-12 pt-8 border-t text-center fade-in">
            <Link href="/blog">
              <Button variant="outline" size="lg" className="cursor-pointer">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Articles
              </Button>
            </Link>
          </footer>
        </div>
      </article>
    </main>
  );
}
