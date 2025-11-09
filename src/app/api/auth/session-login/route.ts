import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";

interface BackendlessUser {
  objectId: string;
  name: string;
  email: string;
  role?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { objectId } = await request.json();

    if (!objectId) {
      return NextResponse.json(
        {
          success: false,
          message: "ObjectId is required",
          data: null,
        },
        {
          status: 401,
        }
      );
    }

    // fetch user
    const user = await Backendless.Data.of("Users").findById<BackendlessUser>(
      objectId
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found or session expired",
          data: null,
        },
        {
          status: 404,
        }
      );
    }

    // Filter sensitive data
    const safeUserData = {
      objectId: user.objectId,
      name: user.name,
      email: user.email,
      role: user.role || "user",
    };

    return NextResponse.json(
      {
        success: true,
        message: "Session restored successfully",
        data: safeUserData,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Session login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Session restore failed",
        data: null,
      },
      { status: 500 }
    );
  }
}
