import { requireAdmin, validateAuth } from "@/lib/auth-middleware";
import Backendless from "@/utils/backendless";
import { NextRequest, NextResponse } from "next/server";

interface BackendlessUser {
  objectId: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
}

type RouteContext = {
  params: Promise<{
    objectId: string;
  }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    // validasi autentikasi
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

    // cek user = admin
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

    const { objectId } = await context.params;

    // validasi req body
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          message: "Status is required",
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    // validasi nilai status
    if (status !== "active" && status !== "suspended") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status. Must be 'active' or 'suspended'",
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    // cegah admin mengubah status diri sendiri
    if (objectId === authResult.user.objectId) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot change your own status",
          data: null,
        },
        {
          status: 403,
        }
      );
    }

    // verify user exist
    const existingUser = await Backendless.Data.of(
      "Users"
    ).findById<BackendlessUser>(objectId);

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
          data: null,
        },
        {
          status: 404,
        }
      );
    }

    // update user status
    await Backendless.Data.of("Users").save({
      objectId,
      status,
    });

    const updatedUser = await Backendless.Data.of(
      "Users"
    ).findById<BackendlessUser>(objectId);

    return NextResponse.json(
      {
        success: true,
        message: `User status updated to ${status} successfully`,
        data: {
          objectId: updatedUser.objectId,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role || "user",
          status: updatedUser.status || "active",
        },
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Update user status error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update user status",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
