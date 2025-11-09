import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";

type RouteContext = {
  params: Promise<{
    objectId: string;
  }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { objectId } = await context.params;
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

    // update edit blog
    const updatedBlog = await Backendless.Data.of("Blogs").save({
      objectId,
      title,
      image,
      author,
      category,
      description,
      content,
    });

    return NextResponse.json({
      success: true,
      message: "Blog has been updated successfully",
      data: updatedBlog,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An error occurred while updating the blog",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
