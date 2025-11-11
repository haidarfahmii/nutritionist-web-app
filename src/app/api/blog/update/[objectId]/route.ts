import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";
import { validateAuth, requireOwnership } from "@/lib/auth-middleware";

type RouteContext = {
  params: Promise<{
    objectId: string;
  }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
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

    const { objectId } = await context.params;

    // cek ownership: admin bisa edit semua sedangkan user cuman bisa edit miliknya
    const ownershipCheck = await requireOwnership(
      authResult.user,
      objectId,
      "Blogs", // nama table
      "ownerId" // nama kolom owner
    );

    if (!ownershipCheck.success) {
      return NextResponse.json(
        {
          success: false,
          message: ownershipCheck.error,
          data: null,
        },
        {
          status: ownershipCheck.status,
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

    // verify blog exist
    const existingBlog = await Backendless.Data.of("Blogs").findById(objectId);

    if (!existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
          data: null,
        },
        {
          status: 404,
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

    return NextResponse.json(
      {
        success: true,
        message: "Blog has been updated successfully",
        data: updatedBlog,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Update blog error: ", error);
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
