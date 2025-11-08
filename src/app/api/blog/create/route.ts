import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";
import { generateSlug } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const { title, image, author, category, description, content } =
      await request.json();

    if (!title || !image || !author || !category || !description || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    // Generate slug from title
    const slug = generateSlug(title);

    // Create blog
    const blog = await Backendless.Data.of("Blogs").save({
      slug,
      title,
      image,
      author,
      category,
      description,
      content,
    });

    return NextResponse.json({
      success: true,
      message: "Blog has been created successfully",
      data: blog,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An error occurred while creating the blog",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
