import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";

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

    const user = await Backendless.UserService.login(email, password, true);

    return NextResponse.json(
      {
        success: true,
        message: "User logged is successfully",
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
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
