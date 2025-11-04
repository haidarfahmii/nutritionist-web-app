import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/blog-utils";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category") || undefined;
    const q = searchParams.get("q") || undefined;

    // Gunakan fungsi data fetching yang sama
    const posts = await getBlogPosts(category, q);

    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        data: null,
      },
      { status: 500 }
    );
  }
}
