import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";

interface BackendlessUser {
  objectId: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "email and password is required",
        },
        {
          status: 400,
        }
      );
    }

    const user = (await Backendless.UserService.login(
      email,
      password,
      true
    )) as BackendlessUser;

    // cek status user setelah login berhasil
    if (user.status === "suspended") {
      // logout user dari backendless
      await Backendless.UserService.logout();

      return NextResponse.json(
        {
          success: false,
          message: "Your account has been suspended. Please contact admin.",
          data: null,
        },
        {
          status: 403,
        }
      );
    }

    // return save user data
    return NextResponse.json(
      {
        success: true,
        message: "User logged is successfully",
        data: {
          objectId: user.objectId,
          name: user.name,
          email: user.email,
          role: user.role || "user",
          status: user.status || "active",
        },
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
