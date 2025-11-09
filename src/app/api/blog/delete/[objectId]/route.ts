import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";
import { validateAuth, requireAdmin } from "@/lib/auth-middleware";

type RouteContext = {
  params: Promise<{
    objectId: string;
  }>;
};

export async function DELETE(request: NextRequest, context: RouteContext) {
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

    // validate admin role
    const adminCheck = requireAdmin(authResult.user);

    if (!adminCheck.success) {
      return NextResponse.json(
        {
          success: false,
          message: adminCheck.error,
          data: null,
        },
        {
          status: adminCheck.status,
        }
      );
    }

    // proceed with delete
    const { objectId } = await context.params;

    // verify blog exist before delete
    const blog = await Backendless.Data.of("Blogs").findById(objectId);

    if (!blog) {
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

    await Backendless.Data.of("Blogs").remove({ objectId });

    return NextResponse.json(
      {
        success: true,
        message: "Blog has been deleted successfully",
        data: null,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Delete blog error: ", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
