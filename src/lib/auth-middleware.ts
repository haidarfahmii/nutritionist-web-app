import { NextRequest } from "next/server";
import Backendless from "@/utils/backendless";

export interface AuthContext {
  user: {
    objectId: string;
    name: string;
    email: string;
    role?: string;
  };
}

/**
 * Middleware untuk validasi autentikasi
 * mengecek objectId dari header Authorization
 */

export async function validateAuth(
  request: NextRequest
): Promise<
  | { success: true; user: AuthContext["user"] }
  | { success: false; error: string; status: number }
> {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return {
        success: false,
        error: "Unauthorized, please login to continue",
        status: 401,
      };
    }

    const objectId = authHeader.replace("Bearer ", "").trim();

    if (!objectId) {
      return {
        success: false,
        error: "Invalid authorization token",
        status: 401,
      };
    }

    const user = await Backendless.Data.of("Users").findById<
      AuthContext["user"]
    >(objectId);

    if (!user) {
      return {
        success: false,
        error: "User not found",
        status: 401,
      };
    }

    return {
      success: true,
      user: {
        objectId: user.objectId,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    };
  } catch (error: any) {
    console.error("Auth validation error:", error);
    return {
      success: false,
      error: error.message,
      status: 500,
    };
  }
}

export function requireAdmin(
  user: AuthContext["user"]
): { success: true } | { success: false; error: string; status: number } {
  if (user.role !== "admin") {
    return {
      success: false,
      error: "Forbidden, Admin access required",
      status: 403,
    };
  }

  return { success: true };
}

/**
 * Middleware untuk validasi ownership
 * cek apakah user adalah pemilik resource atau admin
 */

export async function requireOwnership(
  user: AuthContext["user"],
  resourceId: string,
  resourceTable: string,
  ownerField: string = "ownerId"
): Promise<
  { success: true } | { success: false; error: string; status: number }
> {
  try {
    // admin bypass
    if (user.role === "admin") {
      return { success: true };
    }

    const resource = await Backendless.Data.of(resourceTable).findById<{
      [key: string]: any;
    }>(resourceId);

    if (!resource) {
      return {
        success: false,
        error: "Resource not found",
        status: 404,
      };
    }

    // check ownership
    if (resource[ownerField] !== user.objectId) {
      return {
        success: false,
        error: "Forbidden. You don't have permission to access this resource",
        status: 403,
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Ownership validation error:", error);
    return {
      success: false,
      error: error.message,
      status: 500,
    };
  }
}
