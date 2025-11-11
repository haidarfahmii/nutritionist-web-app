import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";
import { validateAuth, requireAdmin } from "@/lib/auth-middleware";

interface BackendlessUser {
  objectId: string;
  name: string;
  email: string;
  role?: string;
}

type RouteContext = {
  params: {
    objectId: string;
  };
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

    // cek apakah user adalah admin
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

    const { objectId } = context.params;

    // validasi req body
    const { role } = await request.json();

    if (!role) {
      return NextResponse.json(
        {
          success: false,
          message: "Role is required",
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    // validasi nilai role
    if (role !== "user" && role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid role. Must be 'user' or 'admin'",
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    // cegah admin menghapus role admin dari diri sendiri
    if (objectId === authResult.user.objectId && role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot change your own admin role",
          data: null,
        },
        {
          status: 403,
        }
      );
    }

    // verify user exist
    const existingUser = await Backendless.Data.of("Users").findById<BackendlessUser>(
      objectId
    );

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

    // update user role
    await Backendless.Data.of("Users").save({
      objectId,
      role,
    });

    const updatedUser = await Backendless.Data.of("Users").findById<BackendlessUser>(
      objectId
    );

    // return data yang aman
    return NextResponse.json(
      {
        success: true,
        message: "User role updated successfully",
        data: {
          objectId: updatedUser.objectId,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role || "user",
        },
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Update user role error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update user role",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
