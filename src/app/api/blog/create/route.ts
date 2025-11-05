import { NextRequest, NextResponse } from "next/server";
import { createBlogPost } from "@/lib/blog-utils";

/**
 * POST /api/blog/create
 * Create new blog post
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, imageUrl, category, description, content, authorId } = body;

    // Validation
    if (!title || !category || !content || !authorId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: title, category, content, authorId",
          data: null,
        },
        { status: 400 }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Image URL is required",
          data: null,
        },
        { status: 400 }
      );
    }

    if (!description || description.length < 20 || description.length > 200) {
      return NextResponse.json(
        {
          success: false,
          message: "Description must be between 20 and 200 characters",
          data: null,
        },
        { status: 400 }
      );
    }

    // Create blog post
    const savedPost = await createBlogPost({
      title,
      imageUrl,
      category,
      description,
      content,
      authorId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Post created successfully",
        data: savedPost,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/blog/create:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create blog post",
        data: null,
      },
      { status: 500 }
    );
  }
}
