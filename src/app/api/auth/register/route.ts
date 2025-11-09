import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
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

    // Register user
    const user = await Backendless.UserService.register({
      name,
      email,
      password,
      passwordConfirm: password,
      role: "user",
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: user,
    });
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
