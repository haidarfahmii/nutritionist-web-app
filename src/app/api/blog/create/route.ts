import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";
import { generateSlug } from "@/lib/utils";
import { validateAuth } from "@/lib/auth-middleware";

export async function POST(request: NextRequest) {
  try {
    // validate auth
    const authResult = await validateAuth(request);

    if (!authResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: authResult.error,
          data: null,
        },
        {
          status: authResult.status,
        }
      );
    }

    // validate request body
    const { title, image, author, category, description, content } =
      await request.json();

    if (!title || !image || !author || !category || !description || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
          data: null,
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
      ownerId: authResult.user.objectId, // Track owner
    });

    console.log("✅ Blog created with ownerId:", blog.ownerId);

    return NextResponse.json(
      {
        success: true,
        message: "Blog has been created successfully",
        data: blog,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error("Create blog error: ", error);
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
