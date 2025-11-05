import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/blog-utils";

/**
 * GET /api/blog
 * Fetch blog posts with optional filters
 * Query params: category, q (search query)
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category") || undefined;
    const q = searchParams.get("q") || undefined;

    // Fetch posts dengan filters
    const posts = await getBlogPosts(category, q);

    return NextResponse.json(posts, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error: any) {
    console.error("Error in GET /api/blog:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch blog posts",
        data: [],
      },
      { status: 500 }
    );
  }
}
