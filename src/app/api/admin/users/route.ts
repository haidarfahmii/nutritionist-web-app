import { requireAdmin, validateAuth } from "@/lib/auth-middleware";
import Backendless from "@/utils/backendless";
import { NextRequest, NextResponse } from "next/server";

interface BackendlessUser {
  objectId: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
  created?: number;
}

export async function GET(request: NextRequest) {
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

    // Cek apakah user adalah admin
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

    // ambil semua user dari tabel Users
    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setSortBy(["created desc"]);
    queryBuilder.setPageSize(100);

    const users = await Backendless.Data.of("Users").find<BackendlessUser>(
      queryBuilder
    );

    // filter data sensitif
    const safeUsers = users.map((user) => ({
      objectId: user.objectId,
      name: user.name,
      email: user.email,
      role: user.role || "user",
      status: user.status || "active",
      created: user.created,
    }));

    return NextResponse.json(
      {
        success: true,
        message: "Users retrieved successfully",
        data: safeUsers,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
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
